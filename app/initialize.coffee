HomeView = require 'views/home'

$(document).on 'ready', ->
  homeView = new HomeView(el: $('#page-container'))
  homeView.render()