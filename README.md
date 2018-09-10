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
        --mydivwidth: magic: #mydiv ( width  );
}
```

--mydivwidth will be set to the width of #mydiv.

## Add the variable to another css declaration:
```
.myotherdivs {
  width: var(--mydivwidth);
}
```

all .myotherdivs width will be dynamically updated to be the same as #mydiv, even as #mydiv changes.
