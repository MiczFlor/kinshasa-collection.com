#!/bin/bash
sed -i 's/name=\"robots\" content=\"noindex\"/name=\"robots\" content=\"index, follow\"/g' htdocs/*.html
sed -i 's/name=\"robots\" content=\"noindex\"/name=\"robots\" content=\"index, follow\"/g' htdocs/texts/*.html