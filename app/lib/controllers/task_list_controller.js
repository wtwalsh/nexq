TaskListController = RouteController.extend({
  subscriptions: function () {
    this.subscribe('pub-tasks', {});
    this.subscribe('skills', {});
  },

  data: function () {
    // return a global data context like this:
    // Items.findOne({_id: this.params._id});
  },

  list: function () {
    // You can create as many action functions as you'd like.
    // This is the primary function for running your route.
    // Usually it just renders a template to a page. But it
    // might also perform some conditional logic. Override
    // the data context by providing it as an option in the
    // last parameter.
    this.render('TaskList', { /* data: {} */});
  },
  
  edit: function () {
    alert ("edit " + this.params._id);
    this.render('TaskList')
  },
  
  complete: function () {
    //alert ("Complete " + this.params._id);
    doSomething();
    this.render('TaskList')
  }
});

function doSomething () {
  alert("DS");
  return;
}