/*
Fōrmulæ audio package. Module for edition.
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

'use strict';

export class Audio extends Formulae.Package {}

Audio.editionFromFile = function() {
	let input = document.createElement("input");
	input.type   = "file";
	input.accept = "audio/*";

	input.onchange = event => {
		let file = event.target.files[0];
		if (!file) return;
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = readerEvent => {
			let expr = Formulae.createExpression("Audio.WaveformAudio");
			expr.set("Value", readerEvent.target.result);
			expr.set("Format",  file.type || "audio/mpeg");
			Formulae.sExpression.replaceBy(expr);
			Formulae.sHandler.prepareDisplay();
			Formulae.sHandler.display();
			Formulae.setSelected(Formulae.sHandler, expr, false);
		};
	};

	input.click();
}

Audio.setEditions = function() {
	Formulae.addEdition(
		Audio.messages.pathAudio,
		null,
		Audio.messages.leafFromFile,
		Audio.editionFromFile
	);
}

Audio.actionPlayback = {
	isAvailableNow: () => true,
	getDescription: () => Audio.messages.actionPlayback,
	doAction: () => {
		let audioEl = document.createElement("audio");
		audioEl.controls = true;
		audioEl.src = Formulae.sExpression.get("Value");

		let escHandler = e => {
			if (e.key === "Escape") {
				audioEl.pause();
				document.removeEventListener("keydown", escHandler, true);
			}
		};
		document.addEventListener("keydown", escHandler, true);

		let closeBtn = document.createElement("button");
		closeBtn.textContent = Audio.messages.actionPlaybackClose;
		closeBtn.onclick = () => {
			audioEl.pause();
			document.removeEventListener("keydown", escHandler, true);
			Formulae.resetModal();
		};

		let container = document.createElement("div");
		container.style.cssText = "padding: 16px; display: flex; flex-direction: column; align-items: center; gap: 12px;";
		container.appendChild(audioEl);
		container.appendChild(closeBtn);

		Formulae.setModal(container);
		audioEl.play().catch(() => {});
	}
};

Audio.setActions = function() {
	Formulae.addAction("Audio.WaveformAudio", Audio.actionPlayback);
}
