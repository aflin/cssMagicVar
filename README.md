# cssMagicVar
Extend css custom properties (variables) to refer to attributes of any existing element and update dynamically.

Demo is here: https://flin.org/cssMagicVar/

Usage:

## Include cssMagicVar in your page:
```
<script src="cssMagicVar.js"></script>
```

## Add css with Magic Vars:
```
:root {
        --box1width: magic: #mydiv ( width  );
}
```

--box1width will contain the width of #mydiv

## Add the variable to another css declaration:
```
.myotherdivs {
  width: var(--box1width);
}
```

all .myotherdivs width will be dynamically updated to be the same as #mydiv, even as #mydiv changes.

Included demo requires jquery, but basic usage does not.
