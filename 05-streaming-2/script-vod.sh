#!/bin/bash

if [ $# -ne 1 ]; then
    echo "Usage: $0 <input_video_filename_without_extension>"
    exit 1
fi

mkdir -p $1/segments \

ffmpeg -i $1.mp4 \
  -map 0:v -map 0:v -map 0:v -map 0:a \
  -c:v libx264 -preset veryfast \
  -r 24 -g 24 -keyint_min 24 -sc_threshold 0 \
  -b:v:0 1000k -maxrate:v:0 1100k -bufsize:v:0 2000k \
  -b:v:1 500k -maxrate:v:1 550k -bufsize:v:1 1000k \
  -b:v:2 250k -maxrate:v:2 275k -bufsize:v:2 500k \
  -c:a aac -b:a 96k \
  -f dash \
  -min_seg_duration 2000000 \
  -use_template 1 -use_timeline 1 \
  -init_seg_name './segments/init-$RepresentationID$.m4s' \
  -media_seg_name './segments/chunk-$RepresentationID$-$Number%05d$.m4s' \
  -adaptation_sets "id=0,streams=v id=1,streams=a" \
$1/$1.mpd
