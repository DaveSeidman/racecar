if pgrep mjpg_streamer > /dev/null
then
  echo "mjpg_streamer already running"
else
  export LD_LIBRARY_PATH=.
  ./mjpg_streamer -i "input_raspicam.so -fps 20 -q 7 -x 320 -y 240" -o "output_http.so -p 8890 -w ./www"
  echo "mjpg_streamer started"
fi
