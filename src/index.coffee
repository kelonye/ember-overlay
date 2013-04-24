require 'ember'

module.exports = Em.Mixin.create
  didInsertElement: ->
    @_super()
    @$().on 'click', show.bind @

# fn to close overlay
hide = (e) ->
  parentView = @get 'parentView'
  parentView.destroy()

# fn to show overlay
show = (e) ->

  # destroy existing overlay
  Em.$('.component.overlay').remove()

  # close view btn
  closeView = Em.View.create
    template: Em.Handlebars.compile '✘'
    classNames: ['close']
    didInsertElement: ->
      #@_super()
      @$().on 'click', hide.bind @

  # content view
  contentView = @get('overlay').create
    classNames: [
      'content'
    ]


  overlayView = Em.ContainerView.create
    classNames: [
      'component'
      'overlay'
    ]
    childViews: [
      'closeView'
      'contentView'
    ]

    closeView: closeView
    contentView: contentView

  parentView = @get 'parentView'
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
