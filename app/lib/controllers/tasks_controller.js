TasksController = RouteController.extend({
  subscriptions: function () {
    this.subscribe('pub-tasks', {});
  },

  data: function () {
    Tasks.findOne({_id: this.params._id});
  },

  list: function () {
    // You can create as many action functions as you'd like.
    // This is the primary function for running your route.
    // Usually it just renders a template to a page. But it
    // might also perform some conditional logic. Override
    // the data context by providing it as an option in the
    // last parameter.
    this.render('Tasks', { /* data: {} */});
  },
  
  promote: function () {
    this.render('Tasks')
  },
  
  complete: function () {
    doSomething();
    this.render('Tasks')
  }
});

function doSomething () {
  alert("DS");
  return;
}

function assignNextTask () {
  return;
}
