Backbone = require 'backbone'
HomeTemplate = require 'templates/page'

coords =
  boston: '33.284620,-96.503906'
  china: '28.690588,105.996094'
mapParams =
  zoom: 4
  maptype: 'terrain'
  size: '1000x500'
  sensor: false
  style: 'feature:all|element:labels|visibility:off'
bostonMapParams = $.extend {}, mapParams, center: coords.boton
chinaMapParams = $.extend {}, mapParams, center: coords.china
bostonMapUrl = 'http://maps.google.com/maps/api/staticmap?' + $.param(bostonMapParams)
chinaMapUrl = 'http://maps.google.com/maps/api/staticmap?' + $.param(chinaMapParams)

bikePath = [
  [80, 50], [25, 50], [22, 40], [75, 50]
]

class HomeView extends Backbone.View
  template: HomeTemplate
  bikePathStep: 0

  getContext: ->
    bostonCoords = '33.284620,-96.503906'
    chinaCoords = '28.690588,105.996094'
    mapParams =
      zoom: 3
      maptype: 'terrain'
      size: '1000x500'
      sensor: false
      style: 'feature:all|element:labels|visibility:off'
    bostonMapParams = $.extend {}, mapParams, center: bostonCoords
    chinaMapParams = $.extend {}, mapParams, center: chinaCoords
    bostonMapUrl = 'http://maps.google.com/maps/api/staticmap?' + $.param(bostonMapParams)
    chinaMapUrl = 'http://maps.google.com/maps/api/staticmap?' + $.param(chinaMapParams)

    {bostonMapUrl, chinaMapUrl}

  render: ->
    @$el.html @template(@getContext())
    @pathStep()

  pathStep: ->
    coord = bikePath[@bikePathStep]
    @$('.bike').animate(left: coord[0] + '%', top: coord[1] + '%')
    @$('.bike').toggleClass('flip', @currentStep and @currentStep < coord)
    @currentStep = coord
    @bikePathStep++
    if @bikePathStep > bikePath.length - 1
      @bikePathStep = 0
    _.delay _.bind(@pathStep, @), 5000


module.exports = HomeView