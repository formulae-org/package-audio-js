/*
Fōrmulæ audio package. Module for expression definition & visualization.
Copyright (C) 2015-2026 Laurence R. Ugalde

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

"use strict";

export class Audio extends Formulae.Package {}

Audio.loadAudio = function(object, dataURL, mimeType) {
	object.set("Value",  dataURL);
	object.set("Format", mimeType);
}

const WAVEFORM_ICON_PATH = new Path2D(
	"M 27.9999 51.9062 C 41.0546 51.9062 51.9063 41.0547 51.9063 28.0000 C 51.9063 14.9219 41.0312 4.0938 27.9765 4.0938 C 14.8983 4.0938 4.0937 14.9219 4.0937 28.0000 C 4.0937 41.0547 14.9218 51.9062 27.9999 51.9062 Z " +
	"M 25.6327 43.4922 C 24.8593 43.4922 24.3202 42.9531 24.3202 42.2031 L 24.3202 13.7031 C 24.3202 12.9766 24.8827 12.3906 25.6327 12.3906 C 26.3358 12.3906 26.8983 12.9766 26.8983 13.7031 L 26.8983 42.2031 C 26.8983 42.9297 26.3593 43.4922 25.6327 43.4922 Z " +
	"M 35.1014 40.0937 C 34.3983 40.0937 33.8358 39.5078 33.8358 38.8047 L 33.8358 17.0781 C 33.8358 16.375 34.3983 15.7891 35.1014 15.7891 C 35.8514 15.7891 36.4140 16.3516 36.4140 17.0781 L 36.4140 38.8047 C 36.4140 39.5078 35.8514 40.0937 35.1014 40.0937 Z " +
	"M 20.8749 37.1172 C 20.1483 37.1172 19.5624 36.5547 19.5624 35.8281 L 19.5624 20.0313 C 19.5624 19.3281 20.1483 18.7656 20.8749 18.7656 C 21.5780 18.7656 22.1405 19.3281 22.1405 20.0313 L 22.1405 35.8281 C 22.1405 36.5547 21.5780 37.1172 20.8749 37.1172 Z " +
	"M 30.3671 35.2422 C 29.6405 35.2422 29.0780 34.6797 29.0780 33.9766 L 29.0780 21.9062 C 29.0780 21.2031 29.6405 20.6406 30.3671 20.6406 C 31.0936 20.6406 31.6562 21.1797 31.6562 21.9062 L 31.6562 33.9766 C 31.6562 34.7031 31.0936 35.2422 30.3671 35.2422 Z " +
	"M 39.8827 32.4531 C 39.1562 32.4531 38.5936 31.9140 38.5936 31.1875 L 38.5936 24.6953 C 38.5936 23.9687 39.1562 23.4297 39.8827 23.4297 C 40.6093 23.4297 41.1718 23.9687 41.1718 24.6953 L 41.1718 31.1875 C 41.1718 31.9140 40.6093 32.4531 39.8827 32.4531 Z " +
	"M 16.0936 31.2813 C 15.3905 31.2813 14.8046 30.7187 14.8046 30.0156 L 14.8046 25.8672 C 14.8046 25.1640 15.3905 24.6016 16.0936 24.6016 C 16.8202 24.6016 17.4062 25.1640 17.4062 25.8672 L 17.4062 30.0156 C 17.4062 30.7187 16.8202 31.2813 16.0936 31.2813 Z"
);

const WAVEFORM_SVG_X = 4.09;
const WAVEFORM_SVG_Y = 4.09;
const WAVEFORM_SVG_W = 47.82;
const WAVEFORM_SVG_H = 47.82;

function drawWaveformIcon(context, x, y, size) {
	context.save();
	context.translate(x, y);
	context.scale(size / WAVEFORM_SVG_W, size / WAVEFORM_SVG_H);
	context.translate(-WAVEFORM_SVG_X, -WAVEFORM_SVG_Y);
	context.fill(WAVEFORM_ICON_PATH);
	context.restore();
}

Audio.WaveformAudio = class extends Expression.Literal {
	getTag()     { return "Audio.WaveformAudio"; }
	getName()    { return Audio.messages.nameWaveformAudio; }
	prepareDisplay(context) {
		let size = Math.floor(context.fontInfo.size * 3);
		this.width = size;
		this.height = size;
		this.horzBaseline = Math.floor(size / 2);
		this.vertBaseline = Math.floor(size / 2);
	}
	
	display(context, x, y) {
		drawWaveformIcon(context, x, y, this.width);
	}
	
	set(name, value) {
		switch (name) {
			case "Value":  this.dataURL  = value; return;
			case "Format": this.mimeType = value; return;
		}
		super.set(name, value);
	}
	
	get(name) {
		switch (name) {
			case "Value": return this.dataURL;
			case "Format":  return this.mimeType;
		}
		return super.get(name);
	}
	
	getSerializationNames() {
		return [ "Value", "Format" ];
	}
	
	async getSerializationStrings() {
		return [
			this.dataURL.replace(/^data:[^;]+;base64,/, ""),
			this.mimeType
		];
	}
	
	setSerializationStrings(strings, promises) {
		this.mimeType = strings[1];
		this.dataURL  = "data:" + strings[1] + ";base64," + strings[0];
	}
}

Audio.setExpressions = function(moduleName) {
	Formulae.setExpression(moduleName, "Audio.WaveformAudio", Audio.WaveformAudio);
}
