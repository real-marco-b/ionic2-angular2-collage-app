# ionic2-angular2-collage-app

A simple open source photo collage app ready to run on iOS and Android.
You can see it in action on YouTube:

[![Youtube Demo Video](https://img.youtube.com/vi/6MrF_7jQ4Ck/1.jpg)](https://www.youtube.com/watch?v=6MrF_7jQ4Ck)

I created the app to provide a full working sample of how the HTML5 canvas can interact with a device camera and photo album.
Feel free to extend it to your needs. Feedback and improvements are always welcome. :)


## Current Features

* Declarative layout definitions using simple JSON files.

* Layout preview widget.

* Photo tile editor with pan and zoom feature (powered by the incredible hammer.js library).

* Save PNG picture to target.


## Limitations

* Currently, the pictures can only be captured by a new camera snapshot, not imported from an existing picture. Using cordova, this can be done by a simple API call.
I will enhance the sample at a later time.

* Panning and pinch zoom handling is buggy and does not feel natural. Need to be improved.

* Needs some more layouts and cool features like margin and border color configuration.


## Build & Run 

Test run on Desktop:
```
cd path/where/you/cloned/the/app
npm install
ionic serve
```

Run on iOS:
```
cordova platform add ios
ionic run ios -l -c -s
```

## How it works

In this section I will give a brief overview about the implementation. In case you want to enhance the app, this should get you started. 
If you have any further questions, feel free to leave me a message.


### Layout Definition

Collage layouts are defined by json files. A definition file describes percentual position and size of the collage tiles.

Sample layout (two horizontally arranged photo tiles, each with a width of 50%)

```
{
    "layoutId": 1,
    "segments": [
        {
            "width": 50,
        },
        {
            "width": 50,
            "left": 50
        }
    ]
}
```

You can find (and enhance) the existing layouts within the folder www/layouts.

The segment array defines the tiles.

Properties:

| Name          | Desc          	             | Default  |
| ------------- |:------------------------------:| --------:|
| left          | Horizontal position in percent | 0        |
| top           | Vertical position in percent   | 0        |
| width         | Horizontal size in percent     | 100      |
| height        | Vertical size in percent       | 100      |


### Layout Preview Rendering 

The LayoutService (src/services) is an injectable Angular 2 service which loads such a file.
It is used by the LayoutPreviewComponent (src/components/layout-preview) which takes the URL of a layout definition and renders it to a canvas element.
The tiles of the layout are rendered as plain rectangles. To visualize the separated layout segments, a margin is applied to each tile.


### Photo Interaction with the Tile Editor

The picture capturing and interaction is handled by the TileEditorComponent (src/components/tile-editor).
The tile editor is not aware of any layout, it rather displays exactly one picutre using a canvas. The canvas is rendered at a certain position having a certain size. This information
is expected as component inputs.
The tile editor handles picture capturing using the cordova camera plugin. The picture is received and rendered using Base64 data.
The tile editor handles interaction (panning & pinch zoom) by utilizing hammer.js. 
The approach of using a dedicated canvas element for each picture tile makes the implementation more straightforward, as clipping and picture selection concerns are handled automatically.


### Putting the Tile Editors together

A layout can now be described as a set of tile editors, arranged in the way the layout file describes.
The LayoutEditorComponent (src/components/layout-editor) loads a layout definition file and creates the needed set of tile editors with the right position and size arrangement.
This is basically a simple ngFor loop, setting the appropriate component inputs of each tile editor.

The user can now edit the collage by interacting with the set of tile editors.
At this time, the collage exists as N canvas elements.


### Final Rendering

To render a collage file, the N canvas elements need to be merged. Luckily, the HTML5 canvas is capable of rendering another canvas as a picture.
So merging basically reduces to N drawImage calls using the context of an offscreen canvas (basically a canvas element not appended to the DOM).
Saving the rendered file to the device is implemented using the cordova base64-to-gallery plugin. 
As you may already guess, the base64 serialization of the offscreen canvas is passed to the plugin, which creates the file for us. 
The plugin handling is implemented within the GalleryService class (src/services). 