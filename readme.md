# Daily Geometry for Little Printer

I basically took the awesome, awesome work by @tilman at http://geometrydaily.tumblr.com/ and made a feed for it. I wanted a quick project to learn how the thing worked, and I got what I wanted.

### A few quick lessons
- The Little Printer API doesn't seem to parse external CSS files. It's a pain. Embed them like I did in `views/layout.jade`
- If you want to dither an image, use `class='dither'` to do so. It makes a nice effect.
- The etag thing is weird and I'm not doing it properly.

![screen](https://raw.github.com/readywater/lp-dailygeo/master/public/img/screen.png)
![print](https://raw.github.com/readywater/lp-dailygeo/master/public/img/print.jpg)
