require('ember');

module.exports = Em.Mixin.create({
  floatsTo: 'left',
  didInsertElement: function() {
    this._super();
    this
      .$()
      .on('click', this.show.bind(this));
  },
  hide: function(e) {
    this.destroy();
  },
  show: function(e) {

    var self = this

      , closeView = Em.View.create({
          template: Em.Handlebars.compile('✘')
        , classNames: ['close']
        , didInsertElement: function() {
            //this.super();
            this.$().on('click', self.hide.bind(this.get('parentView')));
          }
      })

      , contentView = this.get('overlay').create({
          classNames: ['content']
      })

      , overlayView = Em.ContainerView.create({
          controller: self.get('controller')
        , classNames: 'component overlay'.w()
        , childViews: 'closeView contentView'.w()
        , closeView: closeView
        , contentView: contentView
        , didInsertElement: function(){
          this.$().on('mouseleave', self.hide.bind(this));
        }
      });

    Em
      .$('.component.overlay')
      .remove();

    overlayView.append();

    Em.run.next(function() {

      var el = $(e.currentTarget)
        , pos = el.position()
        , top = pos.top + el.outerHeight() + 5
        , left = pos.left
        , right = $(window).width() - (el.offset().left + el.outerWidth());

      if (self.get('floatsTo') == 'right'){
        overlayView
          .$()
          .css({
            position: 'absolute',
            top: top + "px",
            right: right + "px"
          });
      } else {
        overlayView
          .$()
          .css({
            position: 'absolute',
            top: top + "px",
            left: left + "px"
          });
      }

    });
  }
});
