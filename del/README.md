# Delete Unwanted Characters

[http://tools.zhangjikai.com/del/](http://tools.zhangjikai.com/del/)

Delete unwanted characters at the beginning of each line. You can also write regular expression (e.g. `/^a/`) at the input area for more flexible requirements. 



### Example 1

original text:
```
+ aaaaaa
+ aaaaaaaaaa
+ ggggggggg
+ gggggggg
```

conversion text:
```
aaaaaa
aaaaaaaaaa
ggggggggg
gggggggg
```

### Example 2
original text:
```html
  1 <!DOCTYPE html>
  2 <html lang="en">
  3 <head>
  4     <meta charset="UTF-8">
  5     <meta name="viewport" content="width=device-width, initial-scale=1">
  6     <title>Delete Characters</title>
  7
  8     <link rel="stylesheet" href="assets/css/style.css">
  9 </head>
```

conversion text:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Delete Characters</title>

    <link rel="stylesheet" href="assets/css/style.css">
</head>
```