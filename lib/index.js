require('ember');

module.exports = Em.Mixin.create({
  floatsTo: 'left',
  didInsertElement: function() {
    this._super();
    this
      .$()
      .on('click', this.show.bind(this));
  },
  top: function(e){
    var el = Em.$(e.currentTarget);
    var pos = el.position();
    return pos.top + el.outerHeight() + 5;
  },
  left: function(e){
    var el = Em.$(e.currentTarget);
    var pos = el.position();
    return pos.left;
  },
  right: function(e){
    var el = Em.$(e.currentTarget);
    var pos = el.position();
    return Em.$(window).width() - (el.offset().left + el.outerWidth());
  },
  hide: function(e) {
    this
      .get('_overlay')
      .destroy();
  },
  show: function(e) {

    // remove any existing overlay
    Em
      .$('.component.overlay')
      .remove();

    var that = this;

    var closeView = Em.View.create({
      template: Em.Handlebars.compile('✘'),
      classNames: ['close'],
      didInsertElement: function() {
        this.$().on('click', that.hide.bind(that));
      }
    });

    var contentView = this.get('overlay').create({
      classNames: ['content']
    });

    var overlayView = Em.ContainerView.create({
      controller: that.get('controller'),
      classNames: 'component overlay'.w(),
      childViews: 'closeView contentView'.w(),
      closeView: closeView,
      contentView: contentView,
      parentMasterView: that,
      didInsertElement: function(){

        //this.$().on('mouseleave', that.hide.bind(that));

        var top = that.top(e);

        if (that.get('floatsTo') == 'right'){
          this
            .$()
            .css({
              position: 'absolute',
              top: top + "px",
              right: that.right(e) + "px"
            });
        } else {
          this
            .$()
            .css({
              position: 'absolute',
              top: top + "px",
              left: that.left(e) + "px"
            });
        }

      }
    });

    this.set('_overlay', overlayView);

    overlayView
      .append();

  }
});
