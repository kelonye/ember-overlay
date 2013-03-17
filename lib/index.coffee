get = Em.get
set = Em.set

module.exports = Em.Mixin.create

  click: (e)->

    @_super()
    
    # destroy existing overlay
    Em.$(".component.overlay").remove()

    # close view btn
    closeView = Em.View.create
      template: Em.Handlebars.compile "✘"
      classNames: [
        "close"
      ]
      click: ->
        parentView = get @, "parentView"
        parentView.destroy()

    # content view
    contentView = get( @, "overlayViewClass" ).create
      classNames: [
        "content"
      ]


    overlayView = Em.ContainerView.create
      classNames: [
        "component"
        "overlay"
      ]
      childViews: [
        "closeView"
        "contentView"
      ]

      closeView: closeView
      contentView: contentView

    parentView = get @, "parentView"
    overlayView.append()

    Em.run.next ->

      el = overlayView.$()
      width = el.width()

      offset = width/2

      left = e.pageX - offset
      top = e.pageY

      el.css
        top: "#{top}px"
        left: "#{left}px"
