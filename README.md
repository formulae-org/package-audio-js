# package-audio-js

Audio package for the [Fōrmulæ](https://formulae.org) programming language.

Fōrmulæ is also a software framework for visualization, edition and manipulation of complex expressions, from many fields. The code for a specific field —i.e. audio— is encapsulated in a single unit called a Fōrmulæ **package**.

This repository contains the source code for the **audio package**.

The GitHub organization [formulae-org](https://github.com/formulae-org) encompasses the source code for the rest of packages, as well as the [web application](https://github.com/formulae-org/formulae-js).

### Capabilities ###

* Import waveform audio from a file (MP3, WAV, OGG, and other browser-supported formats)
* Serialize/deserialize audio as base64 within `.formulae` files
* Display as a waveform symbol (▁▂▄█▄▂▁) in the REPL canvas

### Planned ###

* Playback controls dialog: play/pause, volume, seek, close
