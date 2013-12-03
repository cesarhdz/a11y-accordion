# Accessible Accordion

jQuery Accordion that mostly complies with [WAI-Aria 1.0 Authoring Practices](http://www.w3.org/TR/wai-aria-practices/#accordion). This version does not have Control+PageUp and Control+PageDown support.

# Instructions

In your markup you'll need: 

```html
<dl class="js-accordion accordion" role="tablist" aria-multiselectable="true">
  <dt id="title1" role="tab" aria-controls="panel1" aria-selected="true" aria-expanded="true" tabindex="0">...</dt>
  <dd id="panel1" role="tabpanel" aria-labelledby="title1" aria-hidden="false">...</dd>

  <dt id="title2" role="tab" aria-controls="panel2" aria-selected="true" aria-expanded="true" tabindex="0">...</dt>
  <dd id="panel2" role="tabpanel" aria-labelledby="title2" aria-hidden="false">...</dd>

  <dt id="title3" role="tab" aria-controls="panel3" aria-selected="true" aria-expanded="true" tabindex="0">...</dt>
  <dd id="panel3" role="tabpanel" aria-labelledby="title3" aria-hidden="false">...</dd>
</dl>
```

Before the closing `</body>` tag, include a link to the jQuery and the plugin, and instantiate the accordion:

```html
...

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.10.2.min.js"><\/script>')</script>
    <script src="js/jquery.a11yAccordion.js"></script>
    <script>
        $(".js-accordion").a11yAccordion();
    </script>
  </body>
</html>
```

## License

### MIT License

Copyright (c) 2013 copyright Office of Innovative Engagement, U.S.
Department of State.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
