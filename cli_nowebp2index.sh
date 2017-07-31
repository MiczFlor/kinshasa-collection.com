#!/bin/bash
sed -i 's/.webp)/.jpg)/g' htdocs/*.html
sed -i 's/.webp)/.jpg)/g' htdocs/texts/*.html
