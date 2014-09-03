<%@ page contentType="text/javascript;charset=ISO-8859-1" %>

function TitleMarker(titre, position, icon, clickable, hideTitre) {
	this.displayTitre_ = !hideTitre;
	this.titre_ = titre;
	this.position_ = position;
	this.div_ = null;
	this.marker_ = new google.maps.Marker({draggable : false});
	this.visible_ = true;
	this.offsetWidth_ = null;
	this.offsetHeight_ = null;
	
	if (icon != null && icon != 'null') {this.marker_.setIcon(icon)};
	this.marker_.setPosition(position);

	if (clickable)
	{
		var titleMarker = this;
		google.maps.event.addListener(this.marker_, 'click', function(event) {
			if (TitleMarker.markerAvecTitreVisible != null)
			{
				TitleMarker.markerAvecTitreVisible.displayTitre_ = false;
				TitleMarker.markerAvecTitreVisible.draw();
			}
			if (TitleMarker.markerAvecTitreVisible != titleMarker)
			{
				TitleMarker.markerAvecTitreVisible = titleMarker;			
				titleMarker.displayTitre_ = true;
				titleMarker.draw();
			}
			else
			{
				TitleMarker.markerAvecTitreVisible = null;
			}
		})
	}
}; 

TitleMarker.prototype = new google.maps.OverlayView();
TitleMarker.prototype.superSetMap = TitleMarker.prototype.setMap;
TitleMarker.markerAvecTitreVisible = null;
		
TitleMarker.prototype.setVisible = function(visible) {
	this.visible_ = visible;
	 this.marker_.setVisible(visible);
	 if (visible) {this.div_.style.display = 'block'} else {this.div_.style.display = 'none'}
}; 
				
TitleMarker.prototype.setMap = function(map) {
	this.superSetMap(map);
	this.marker_.setMap(map);
}; 
				
TitleMarker.prototype.onAdd = function() {
	var div = document.createElement('SPAN');
	div.style.position = 'absolute';
	div.className = 'TitleMarker';
	div.innerHTML = '&nbsp;' + this.titre_ + '&nbsp;';
			
	this.div_ = div;

	var panes = this.getPanes();
	panes.floatPane.appendChild(div);
};

TitleMarker.prototype.draw = function() {
	var overlayProjection = this.getProjection();
	var p = overlayProjection.fromLatLngToDivPixel(this.position_);
	var div = this.div_;
	if (this.displayTitre_ && this.visible_)
	{
		div.style.display = "block";
	}
	else
	{
		div.style.display = "none";
	}
	div.style.whiteSpace = 'nowrap';
	
	var osW = this.offsetWidth_;
	if (osW == null)
	{
		osW =  div.offsetWidth;
	}
	var osH = this.offsetHeight_;
	if (osH == null)
	{
		osH =  div.offsetHeight;
	}
	
	div.style.left = (p.x - osW / 2) + 'px';
	div.style.top = (p.y  - osH - 35)+ 'px';
	
	if (div.offsetWidth != null && div.offsetWidth > 0)
	{
		this.offsetWidth_ = div.offsetWidth;
	}
	if (div.offsetHeight != null && div.offsetHeight > 0)
	{
		this.offsetHeight_ = div.offsetHeight;
	}
	
}; 
	
TitleMarker.prototype.onRemove = function() {
	this.div_.parentNode.removeChild(this.div_);
	this.div_ = null;
}; 

<%= params["callback"] %>();