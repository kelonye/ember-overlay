![](https://dl.dropbox.com/u/30162278/ember-overlay-left.png)

![](https://dl.dropbox.com/u/30162278/ember-overlay-right.png)


Install
---

    $ component install kelonye/ember-overlay

Usage
---

javascript

```
// view to be created as overlay
OverlayView = Em.View.extend({
  template: Em.Handlebars.compile('Hello!'),
  click: function(e){
    // do stuff
  }
});

// view to handle mouse click event
Em.View.createWithMixins(require('ember-overlay'), {
  // floats to
  floatsTo: 'right',
  // specify the overlay view
  overlay: OverlayView
}).appendTo('body');
```

Example
---

    $ make example

License
---

MIT
