function jsonpRequest(a,b,c){$.ajax({url:a,jsonp:b,dataType:"jsonp",beforeSend:function(){},success:function(a){c(a.error,a)},error:function(a,b,d){console.log("error",d),c(d)},complete:function(){}})}function toRad(a){return a*(Math.PI/180)}function toDeg(a){return a*(180/Math.PI)}function dateLineProcessor(a){for(var b,c,d,e=0,f=0;f<a.length;f++)f-1>=0&&f+1<=a.length&&(b=a[f-1],c=a[f],d=a[f+1],b[0]<90&&c[0]>90&&(e=-1),c[0]<90&&b[0]>90&&(e=1),1===e?c[0]=-180-(180-c[0]):-1===e&&(c[0]=180+(180+c[0])))}function distanceTo(a,b){var c=L.latLng([a.lat,a.lon]),d=L.latLng([b.lat,b.lon]);return c.distanceTo(d)}function randomHexColor(){var a,b={green:"#6FFF00",pink:"#FF00FF",yellow:"#FFFF00",blue:"#4D4DFF",red:"#FE0001",orange:"#FF4105",purple:"#993CF3"},c=0;for(var d in b)Math.random()<1/++c&&(a=d);return a}function parseTransform(a){var b={};for(var c in a=a.match(/(\w+\((\-?\d+\.?\d*,?)+\)+)/g)){var d=a[c].match(/[\w\.\-]+/g);b[d.shift()]=d}return b}var Airport=function(a,b){this.name=a.name,this.classification=a.classification,this.lat=a.latitude,this.lon=a.longitude,this.icon=b.icon},Flex=function(a){if(null==a)throw new Error("flex config required");if(null==a.appId||null==a.appKey)throw new Error("flex appId and appKey required");this.appId=a.appId,this.appKey=a.appKey,this.fsBasePath="https://api.flightstats.com/flex/"};Flex.prototype.fetchAirportByCode=function(a,b,c){var d=[this.fsBasePath,"airports/rest/v1/jsonp/",a,"/today","?appId=",this.appId,"&appKey=",this.appKey];for(var e in b)d.push("&"),d.push(e),d.push("="),d.push(b[e]);d=d.join(""),jsonpRequest(d,"callback",function(a,b){c(a,b)})},Flex.prototype.fetchActiveOutgoingFlightsForAirport=function(a,b,c){var d=[this.fsBasePath,"flightstatus/rest/v2/jsonp/airport/tracks/",a,"/dep?appId=",this.appId,"&appKey=",this.appKey];for(var e in b)d.push("&"),d.push(e),d.push("="),d.push(b[e]);d=d.join(""),jsonpRequest(d,"callback",function(a,b){c(a,b)})},Flex.prototype.fetchActiveIncomingFlightsForAirport=function(a,b,c){var d=[this.fsBasePath,"flightstatus/rest/v2/jsonp/airport/tracks/",a,"/arr?appId=",this.appId,"&appKey=",this.appKey];for(var e in b)d.push("&"),d.push(e),d.push("="),d.push(b[e]);d=d.join(""),jsonpRequest(d,"callback",function(a,b){c(a,b)})},Flex.prototype.fetchFlightTracksForFlight=function(a,b,c){var d=[this.fsBasePath,"flightstatus/rest/v2/jsonp/flight/track/",a,"?appId=",this.appId,"&appKey=",this.appKey];for(var e in b)d.push("&"),d.push(e),d.push("="),d.push(b[e]);d=d.join(""),jsonpRequest(d,"callback",function(a,b){c(a,b)})},Flex.prototype.fetchFlightsWithinBounds=function(a,b,c){if(null==a.topLat||null==a.leftLon||null==a.bottomLat||null==a.rightLon)throw new Error("required bounds property missing");var d=[this.fsBasePath,"flightstatus/rest/v2/jsonp/flightsNear/",a.topLat,"/",a.leftLon,"/",a.bottomLat,"/",a.rightLon,"?appId=",this.appId,"&appKey=",this.appKey];for(var e in b)d.push("&"),d.push(e),d.push("="),d.push(b[e]);d=d.join(""),jsonpRequest(d,"callback",function(a,b){c(a,b)})},Flex.prototype.fetchActiveAirports=function(a,b){var c=[this.fsBasePath,"airports/rest/v1/jsonp/active?appId=",this.appId,"&appKey=",this.appKey];for(var d in a)c.push("&"),c.push(d),c.push("="),c.push(a[d]);c=c.join(""),jsonpRequest(c,"callback",function(a,c){b(a,c)})};var Flight=function(a,b,c){function d(a,b,c){e[a]=null!=b?b:c}var e=this;if(this.flex=new Flex(b.flexConfig),this.flightId=a,this.map=c,this.planeIcon=b.icon||"M11.544,23.594c0.3-0.008,0.498,0.041,0.509,0.316s0.447,0.236,0.447,0.236s0.437,0.039,0.447-0.236 c0.012-0.275,0.209-0.324,0.509-0.316c0.233,0.004,1.563,0.521,2.243,0.641c0.668,0.119,1.425-0.398-0.043-1.387 c-0.555-0.373-1.594-1.127-1.807-1.355c-0.143-0.154-0.129-3.689-0.142-4.832s0-2.453,0-2.453s0.052-0.588,0.122-0.594 c0.071-0.008,7.27,2.914,8.619,3.617c1.35,0.705,2.569,1.334,2.566,0.367c0,0,0.214-1.195-3.145-3.332 c-3.358-2.138-3.764-2.522-3.764-2.522l-0.464-0.328c0.001-0.019,0.006-0.036,0.006-0.055V10.25c0-0.441-0.357-0.798-0.799-0.798 s-0.799,0.357-0.799,0.798v0.042l-2.066-1.458c0,0-0.101-0.363-0.112-0.556c-0.014-0.194,0.06-3.191-0.026-4.249 c-0.071-0.884-0.524-3.28-1.346-3.28l0,0l0,0c-0.821,0-1.274,2.396-1.346,3.28c-0.086,1.058-0.013,4.055-0.026,4.249 c-0.013,0.193-0.113,0.556-0.113,0.556l-2.066,1.458V10.25c0-0.441-0.357-0.798-0.798-0.798c-0.44,0-0.799,0.357-0.799,0.798v1.111 c0,0.019,0.004,0.036,0.005,0.055l-0.464,0.328c0,0-0.404,0.384-3.762,2.522c-3.358,2.137-3.146,3.332-3.146,3.332 c-0.002,0.967,1.217,0.338,2.567-0.367c1.35-0.703,8.547-3.625,8.619-3.617c0.071,0.006,0.123,0.594,0.123,0.594 s0.013,1.311,0,2.453s0.001,4.678-0.142,4.832c-0.213,0.229-1.251,0.982-1.807,1.355c-1.467,0.988-0.711,1.506-0.043,1.387 C9.982,24.115,11.312,23.598,11.544,23.594z",this.planeIconUrl=b.planeIconUrl,d("planeIconSize",b.planeIconSize,26),d("planeIconScale",b.planeIconScale,1),this.planeIconRotation=b.planeIconRotation||0,this.planeIconColor=b.planeIconColor||"#FFFFFF",d("planeIconOpacity",b.planeIconOpacity,1),d("initialAnimationPathPointCount",b.initialAnimationPathPointCount,15),this.fsBasePath=b.fsBasePath||"/data/",this.pollingRate=b.pollingRate||6e4,this.color=b.color||"#FFFFFF",this.drawPlanFlag=b.drawPlan||!1,this.planColor=b.planColor||"#FFFFFF",d("planWidth",b.planWidth,2),d("planOpacity",b.planOpacity,1),this.arcColor=b.arcColor||"#FFFFFF",d("arcWidth",b.arcWidth,2),d("arcOpacity",b.arcOpacity,1),console.log(b),this.pathColor=b.pathColor||"#FFFFFF",d("pathWidth",b.pathWidth,2),d("pathOpacity",b.pathOpacity,1),d("pathPointRadius",b.pathPointRadius,1),this.data={},this.transitions={},this.positions=[],this.interpolatedPositions=[],this.travelledPositions=[],this.untravelledPositions=[],this.waypoints=[],this.points=[],this.stillInterior=!0,null!=this.planeIconUrl&&this.planeIconUrl.length>0)this.plane=c.planes.append("svg:image").attr("xlink:href",this.planeIconUrl).attr("height",this.planeIconSize+"px").attr("width",this.planeIconSize+"px").attr("transform","scale("+this.planeIconScale+")");else{if(!(null!=this.planeIcon&&this.planeIcon.length>0))throw new Error("Missing planeIcon or planeIconUrl");this.plane=c.planes.append("path").attr("stroke",this.planeIconColor).attr("stroke-width",1).attr("fill",this.planeIconColor).attr("fill-opacity",this.planeIconOpacity).attr("stroke-opacity",this.planeIconOpacity).attr("transform-origin","50% 50%").attr("d",this.planeIcon)}this.path=c.paths.append("path").attr("fill","none").attr("stroke","none"),this.plan=c.plans.append("path").attr("fill","none").attr("stroke",this.planColor).attr("stroke-width",this.planWidth).attr("stroke-opacity",this.planOpacity),this.arc=c.arcs.append("path").attr("fill","none").attr("stroke",this.arcColor).attr("stroke-width",this.arcWidth).attr("stroke-opacity",this.arcOpacity)};Flight.prototype.showPopup=function(a){var b=this;this.popup=L.popup({closeButton:!1,autoPan:!1}).setLatLng(this.position(a)).setContent("<p>"+this.data.flightTrack.carrierFsCode+this.data.flightTrack.flightNumber+" "+this.data.flightTrack.departureAirportFsCode+"->"+this.data.flightTrack.arrivalAirportFsCode+"</p>").openOn(this.map.map),setInterval(function(){b.popup.setLatLng(b.position(a))},250)},Flight.prototype.showMarker=function(){var a=this;null==this.marker&&(this.marker=L.marker(this.position()).addTo(this.map.map)),setInterval(function(){a.marker.setLatLng(a.position())},250)},Flight.prototype.initialize=function(a){this.data=a,this.updateData(a),a.flightTrack.positions.length>5&&(this.initializePositions(),this.buildAirports(),this.drawArc(),this.buildTransitions(!0),this.initialized=!0,this.plane.attr("fill-opacity",this.planeIconOpacity),this.plane.attr("stroke-opacity",this.planeIconOpacity),this.startPolling())},Flight.prototype.buildAirports=function(){var a;if(null!=this.airportData)for(var b=0;b<this.airportData.length;b++)a=this.airportData[b],a.svg=this.map.airports.append("svg:text").text(a.fs).style("fill",this.color),this.departureAirportCode==a.fs?this.departureAirport=a:this.arrivalAirportCode==a.fs&&(this.arrivalAirport=a)},Flight.prototype.drawAirports=function(){this.departureAirport.svg.attr("transform",this.transformGenerator([this.departureAirport.longitude,this.departureAirport.latitude])),this.arrivalAirport.svg.attr("transform",this.transformGenerator([this.arrivalAirport.longitude,this.arrivalAirport.latitude]))},Flight.prototype.panTo=function(a){null!=this.untravelledPositions[0]&&(this.map.map.panTo([this.untravelledPositions[0].lat,this.untravelledPositions[0].lon]),null!=a&&this.map.map.setZoom(a))},Flight.prototype.initializePositions=function(){if(this.data.flightTrack.positions.length<=5)alert("not enough data");else if(this.data.flightTrack.positions.length>5){for(var a=this.data.flightTrack.positions.length-1;a>=0;a--)this.data.flightTrack.positions[a].hasAnimation=!1,this.positions.push(this.data.flightTrack.positions[a]);"waypoints"in this.data.flightTrack&&(this.waypoints=this.data.flightTrack.waypoints),this.buildInterpolatedPositions()}},Flight.prototype.buildInterpolatedPositions=function(){this.path.attr("d",this.map.invisibleLineProjector(this.reformatPositions(this.positions))),this.pathLength=this.path.node().getTotalLength();var a=0,b=5,c={},d={},e={},f=0,g=Math.floor(this.pathLength),h=Math.floor(this.pathLength/b);for(a=0;g>a;a+=b)f=a/g,d=this.path.node().getPointAtLength(f*this.pathLength),c=this.map.projection.invert([d.x,d.y]),e={},e.id=a/b,e.lat=c[1],e.lon=c[0],e.course=this.positions[Math.floor(f*this.positions.length)].course,e.speedMph=this.positions[Math.floor(f*this.positions.length)].speedMph,this.initialized?e.id>this.untravelledPositions[this.untravelledPositions.length-1].id&&(e.hasAnimation=!1,e.drawn=!1,this.untravelledPositions.push(e)):e.id>=h-this.initialAnimationPathPointCount?(e.hasAnimation=!1,e.drawn=!1,this.untravelledPositions.push(e)):(e.hasAnimation=!0,e.drawn=!0,this.travelledPositions.push(e))},Flight.prototype.buildTransitions=function(a){var b,c,d,e=this.map.map.getZoom();if(b=this.interpolatedPosition||this.untravelledPositions[0],c=7>e?this.untravelledPositions[this.untravelledPositions.length-1]:this.untravelledPositions[1],a&&null!=b&&null!=c)d=this.transformGenerator(b,c),this.plane.attr("transform",d.transform);else if(null==b&&null==c)throw new Error("null or undefined positions");if(7>e)this.addTransition(b,c,0);else for(var f=0;f<this.untravelledPositions.length;f++)c=this.untravelledPositions[f+1],0===f&&null!=this.interpolatedPosition&&a?b=this.interpolatedPosition:0!==f||this.initialized?0!==f&&(b=this.untravelledPositions[f],null==b||null==c||b.hasAnimation||this.addTransition(b,c,f-1)):(b=this.untravelledPositions[f],null==b||null==c||b.hasAnimation||this.addTransition(b,c,f));this.interpolatedPosition=null},Flight.prototype.addTransition=function(a,b,c){var d=this,e=d.transformGenerator(a,b);this.transitions[b.id]={},0===c&&(this.transitions[a.id]={},this.transitions.time=(new Date).getTime()),this.transitions[a.id].position=a,this.transitions[a.id].transform=e,this.transitions[a.id].duration=this.animationTime(a.speedMph,distanceTo(a,b)),a.delay=this.transitions[a.id].delay=this.transitions[a.id].delay||0,a.duration=this.transitions[a.id].duration=this.transitions[a.id].duration||0,b.delay=this.transitions[b.id].delay=this.transitions[a.id].delay+this.transitions[a.id].duration,a.transitionTime=this.transitions[a.id].transitionTime=a.delay+this.transitions.time,this.transitions[a.id].transition=this.plane.transition().delay(this.transitions[a.id].delay).duration(this.transitions[a.id].duration).ease("linear").attr("transform",e.transform).each("end",function(){d.travelledPositions.push(d.untravelledPositions[0]),d.untravelledPositions.shift()}).each("start",function(){}),a.hasAnimation=!0},Flight.prototype.showPlan=function(){null!=this.plan&&this.plan.attr("stroke-opacity",this.planOpacity)},Flight.prototype.hidePlan=function(){null!=this.plan&&this.plan.attr("stroke-opacity","0")},Flight.prototype.drawPlan=function(){null!=this.waypoints&&this.plan.attr("d",this.map.projectLine(this.reformatPositions(this.waypoints)))},Flight.prototype.drawArc=function(){var a=[this.departureAirport.latitude,this.departureAirport.longitude],b=[this.arrivalAirport.latitude,this.arrivalAirport.longitude],c={type:"Feature",geometry:{type:"LineString",coordinates:[a,b]},properties:{}};this.arc.data(c),this.arc.attr("d",this.map.arcProjector)},Flight.prototype.allTransitions=function(){return this.plane[0][0].__transition__},Flight.prototype.draw=function(a){var b=this;this.cancelTransitions(),this.path.attr("d",b.map.invisibleLineProjector(b.reformatPositions(b.positions))),this.pathLength=b.path.node().getTotalLength(),this.drawPlanFlag&&this.drawPlan();for(var c=0;c<this.untravelledPositions.length;c++)this.untravelledPositions[c].hasAnimation=!1,this.untravelledPositions[c].drawn=!1;this.buildTransitions(a)},Flight.prototype.cancelTransitions=function(){this.plane.transition().duration(0)},Flight.prototype.remove=function(){this.plane.remove(),this.plan.remove(),this.arc.remove()},Flight.prototype.redraw=function(){var a=this;this.path.attr("d",a.map.invisibleLineProjector(a.reformatPositions(a.positions))),this.pathLength=a.path.node().getTotalLength(),this.buildInterpolatedPositions(),this.drawPlanFlag&&this.drawPlan(),this.buildTransitions()},Flight.prototype.activeTransition=function(){try{return this.plane[0][0].__transition__[this.plane[0][0].__transition__.active]}catch(a){return null}},Flight.prototype.transitionCount=function(){try{return this.plane[0][0].__transition__.count}catch(a){return null}},Flight.prototype.startPolling=function(){var a=this;setInterval(function(){a.fetchFlightTracks(5,function(b,c){b?console.log(b):(a.updateData(c),a.redraw())})},a.pollingRate)},Flight.prototype.updateData=function(a){var b=this,c=(this.initialized?5:null,0),d={},e={},f=!1;if("departureAirportFsCode"in a.flightTrack&&(b.departureAirportCode=a.flightTrack.departureAirportFsCode),"arrivalAirportFsCode"in a.flightTrack&&(b.arrivalAirportCode=a.flightTrack.arrivalAirportFsCode),b.waypoints=a.flightTrack.waypoints,b.airportData=a.appendix.airports,b.positions.length>0)for(c=0;c<a.flightTrack.positions.length;c++){d=a.flightTrack.positions[c],e=a.flightTrack.positions[c+1],f=!1;for(var g=0;g<b.positions.length;g++)if(b.positions[g].date===a.flightTrack.positions[c].date){f=!0;break}f||(d.hasAnimation=!1,b.positions.push(d))}},Flight.prototype.fetchFlightTracks=function(a,b){var c=this,d={includeFlightPlan:"true"};null!=a&&(d.maxPositions=a),this.flex.fetchFlightTracksForFlight(this.flightId,d,function(a,d){b(a,d,c)})},Flight.prototype.calculateHeading=function(a,b){a=this.map.projectContainerPoint([a.lon,a.lat]),b=this.map.projectContainerPoint([b.lon,b.lat]);var c=b[1]-a[1],d=b[0]-a[0];if(0!==d&&0!==c){var e=Math.sqrt(Math.pow(c,2)+Math.pow(d,2)),f=57.2957795*Math.atan(c/e/(d/e));return this.lastKnownHeading=0>d?f+270:f+90,this.lastKnownHeading}return this.lastKnownHeading},Flight.prototype.reformatPositions=function(a){for(var b=[],c=0;c<a.length;c++)b.push([a[c].lon,a[c].lat]);return dateLineProcessor(b),b},Flight.prototype.transformGenerator=function(a,b){var c,d,e,f,g=this.planeIconSize/2;return null!=a&&null!=b?(c=this.map.projectContainerPoint([a.lon,a.lat]),d="translate("+(c[0]-g)+","+(c[1]-g)+")",e=this.calculateHeading(a,b),f="rotate("+e+", "+g+", "+g+")",isNaN(e)&&(f=null!=a.course?"rotate("+a.course+", "+g+", "+g+")":"rotate(0, "+g+", "+g+")"),{translate:d,rotate:f,transform:d+""+f+"scale("+this.planeIconScale+")"}):null!=a?(c=this.map.projectContainerPoint([a[0],a[1]]),d="translate("+c[0]+","+c[1]+") scale("+this.planeIconScale+")"):void 0},Flight.prototype.animationTime=function(a,b){return a=1.60934*a,b/=1e3,b/a*60*60*1e3},Flight.prototype.position=function(a){var b=parseTransform(this.plane.attr("transform")),c=b.translate,d=toRad(b.rotate-45),e=Math.sin(d),f=Math.cos(d),g=this.planeIconSize/2;return c[0]=parseInt(c[0],10)+-1*e*g+a[0],c[1]=parseInt(c[1],10)+1*f*g+a[1],isNaN(c[0])||isNaN(c[1])?void 0:this.map.map.containerPointToLatLng(c)};var fsBasePath="/data/",Map=function(a){function b(a){var b=map.latLngToLayerPoint(new L.LatLng(a[1],a[0]));return[b.x,b.y]}var c=this;a.subdomains=a.subdomains||"abcd",this.flexConfig=a.flexConfig,this.flex=new Flex(this.flexConfig),this.mapId=a.id||"map",this.map=L.map(this.mapId,a.leaflet).setView([0,0],a.initialZoom||10).addLayer(L.tileLayer(a.tiles,{subdomains:a.subdomains})),this.data={},this.svg=d3.select(this.map.getPanes().overlayPane).append("svg"),this.plans=this.svg.append("g").attr("class","leaflet-zoom-hide").attr("id","plans"),this.arcs=this.svg.append("g").attr("class","leaflet-zoom-hide").attr("id","arcs"),this.planes=this.svg.append("g").attr("class","leaflet-zoom-hide").attr("id","planes"),this.airports=this.svg.append("g").attr("class","leaflet-zoom-hide").attr("id","airports"),this.paths=this.svg.append("g").attr("class","leaflet-zoom-hide").attr("id","paths"),this.flights={},this.airportConfig=a.airportConfig||{},this.flightConfig=a.flightConfig||{},this.airportConfig.flexConfig=this.flexConfig,this.flightConfig.flexConfig=this.flexConfig,this.map.on("viewreset",function(){}),this.map.on("zoomend",function(){}),this.map.on("moveend",function(){c.reset()}),this.map.on("resize",function(){}),this.map.on("focus",function(){}),this.map.on("blur",function(){}),this.map.on("movestart",function(){c.saveAnimationPositions()}),this.map.on("zoomstart",function(){}),this.projection=d3.geo.mercator().scale(1e4).precision(.1),this.invisibleLineProjector=d3.svg.line().x(function(a){var b=c.projection(a);return b[0]}).y(function(a){var b=c.projection(a);return b[1]}).interpolate("cardinal"),this.arcProjector=d3.geo.path().projection(b),this.projectLine=d3.svg.line().x(function(a){var b=L.latLng(a[1],a[0]),d=c.map.latLngToContainerPoint(b);return d.x}).y(function(a){var b=L.latLng(a[1],a[0]),d=c.map.latLngToContainerPoint(b);return d.y}).interpolate("cardinal"),this.projectLayerPoint=function(a){var b=c.map.latLngToLayerPoint(new L.LatLng(a[1],a[0]));return[b.x,b.y]},this.projectContainerPoint=function(a){var b=c.map.latLngToContainerPoint(new L.LatLng(a[1],a[0]));return[b.x,b.y]}};Map.prototype.panTo=function(a){this.map.panTo(a)},Map.prototype.addFlight=function(a,b){var c=this;c.flights[a]=new Flight(a,c.flightConfig,c),c.flights[a].fetchFlightTracks(null,function(a,c,d){a?console.log(a):c.error?console.log(c.error.errorMessage):d.initialize(c),null!=b&&b(a,d)})},Map.prototype.addAirport=function(){},Map.prototype.clear=function(){this.plans.html(""),this.arcs.html(""),this.planes.html(""),this.airports.html("")},Map.prototype.removeFlight=function(a){a.remove(),delete a},Map.prototype.removeFlights=function(){for(var a in this.flights)this.flights[a].remove(),this.flights[a]={},delete this.flights[a]},Map.prototype.removeAirport=function(){},Map.prototype.reset=function(){var a=this.map.getBounds(),b=this.projectLayerPoint([a.getWest(),a.getSouth()]),c=this.projectLayerPoint([a.getEast(),a.getNorth()]);this.paths.selectAll("*").remove(),this.svg.attr("width",c[0]-b[0]).attr("height",b[1]-c[1]).style("margin-left",b[0]+"px").style("margin-top",c[1]+"px");for(var d in this.flights)this.flights[d].initialized&&this.flights[d].draw(!0)},Map.prototype.saveAnimationPositions=function(){for(var a in this.flights){var b=this.flights[a].travelledPositions[this.flights[a].travelledPositions.length-1],c=this.flights[a].untravelledPositions[0];if(null!=b&&null!=c){var d=(new Date).getTime()-this.flights[a].transitions.time,e=c.duration,f=d/e;f>1&&(f=1);var g=d3.geo.interpolate([b.lon,b.lat],[c.lon,c.lat]),h=g(f);this.flights[a].interpolatedPosition={},this.flights[a].interpolatedPosition.lat=h[1],this.flights[a].interpolatedPosition.lon=h[0],this.flights[a].interpolatedPosition.speedMph=b.speedMph,this.flights[a].interpolatedPosition.course=b.course,this.flights[a].plane.transition().duration(0)}else console.log("No positions for flight",a)}},Map.prototype.fetchActiveFlightsForAirport=function(a,b,c){var d=this,e=[fsBasePath,"flightstatus/rest/v2/json/airport/tracks/",a,"/dep?maxFlights=",b];e=e.join(""),d3.json(e,function(a,b){a?console.log("Request Error:",a):d.data=b,c(a)})},Map.prototype.buildFlights=function(){var a=this;for(i=0;i<a.data.flightTracks.length;i++)a.data.flightTracks[i].positions.length>0&&(document.flight=a.flights[a.data.flightTracks[i].flightId]=new Flight(a.data.flightTracks[i].flightId,a.flightConfig,a),a.flights[a.data.flightTracks[i].flightId].fetchFlightTracks(null,function(b,c,d){b?console.log(b):(d.initialize(c),a.reset())}))};