![](https://dl.dropbox.com/u/30162278/ember-overlay.png) 

Usage
----------

See [demo](http://kelonye.github.com/#/pages/overlay)

javascript

```
# view to be created as overlay
App.OverlayView = Em.View.extend()

# view to handle mouse click event
App.View = Em.View  require("ember-overlay"),
  # specify the overlay view
  overlayViewClass: App.OverlayView
```

License
-------------

MIT
