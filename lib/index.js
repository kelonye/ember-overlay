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
    this.destroy();
  },
  show: function(e) {

    var self = this;

    var closeView = Em.View.create({
      template: Em.Handlebars.compile('✘'),
      classNames: ['close'],
      didInsertElement: function() {
        //this.super();
        this.$().on('click', self.hide.bind(this.get('parentView')));
      }
    });

    var contentView = this.get('overlay').create({
      classNames: ['content']
    });

    var overlayView = Em.ContainerView.create({
      controller: self.get('controller'),
      classNames: 'component overlay'.w(),
      childViews: 'closeView contentView'.w(),
      closeView: closeView,
      contentView: contentView,
      didInsertElement: function(){
        this.$().on('mouseleave', self.hide.bind(this));
      }
    });

    // remove any existing overlay
    Em
      .$('.component.overlay')
      .remove();

    overlayView.append();

    Em.run.next(function() {

      var top = self.top(e);

      if (self.get('floatsTo') == 'right'){
        overlayView
          .$()
          .css({
            position: 'absolute',
            top: top + "px",
            right: self.right(e) + "px"
          });
      } else {
        overlayView
          .$()
          .css({
            position: 'absolute',
            top: top + "px",
            left: self.left(e) + "px"
          });
      }
    });
  }
});
