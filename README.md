# 🥇totexe

Executable for .tot file handler. Tot is not totally new but a file format for managing data in a file. Normally you can write a code to limit the data up to 64KiB (65536 bytes). That would just be good and big enough in general.

## 💪 The things you can do with tot.exe:

```
1. You can just use it for data storage system. Building your own can be very bothwesome and sometimes it can be spending a lot of time.
2. Mutex and semaphores(No number limits) are implemented. You can safely modify a data asynchronously
3. You can edit .Tot format yourself. Because it is string based data.
4. You can use it in any project, because IPC (Inter-Process Communication) is based on tcp connection and port number can be passed as an argument.
```

If you want to know about .tot file format, you can have a look at [totjs repository](https://github.com/opdev1004/totjs).

## 🛠 Requirements

My setting is Windows 10, so I cannot test other OS. However, it should work as almost everything is written in Javascript.

However, I recommend using LTS version of Node.js and recent version of OS.

## 📖 APIs:

Send stringfied JSON data with message though tcp connection maybe some cases do not require to send data or just send string data. Now Tot.exe is designed to manage multiple .tot files as in needs.

### Initalisation of data storage

You need to initialise before you can start anything.

```
message: "init-tot"
json data: {
    totname: "This is the name of where you store data",
    filename: "This is the filename(path) of .tot file."
}
```

### Change filename (path)

```
message: "open"
json data: {
    totname: "This is the name of where you store data",
    filename: "This is the filename(path) of .tot file."
}
```

### Remove tot from memory

This actually doesn't have huge effect as normally we don't hold data in memory and they are going to be garbage collected. But nothing wrong when you want to get rid of unnecessary things.

```
message: "close"
json data: {
    totname: "This is the name of where you store data"
}
```

### Get data by name

```
message: "get-data-by-name"
json data: {
    totname: "This is the name of where you store data",
    name: "Name of data in .tot file"
}
```

### Get data by name at byte position

```
message: "get-data-by-name-at"
json data: {
    totname: "This is the name of where you store data",
    name: "Name of data in .tot file",
    position: "Where you want to get data from certain position"
}
```

### Push data

```
message: "push"
json data: {
    totname: "This is the name of where you store data",
    name: "Name of data in .tot file",
    data: "String data. Stringfied XML and JSON"
}
```

### Update data

This marks old data to be removed. And push new data with name.

```
message: "update"
json data: {
    totname: "This is the name of where you store data",
    name: "Name of data in .tot file",
    data: "String data. Stringfied XML and JSON"
}
```

### Hard-update data

Hard-update can be slower than update. Because this rewrite whole data. Only for small files when you know what you are doing. Otherwise just use update and use clean every day, week or month. Take care of the data more efficiently.

```
message: "hard-update"
json data: {
    totname: "This is the name of where you store data",
    name: "Name of data in .tot file",
    data: "String data. Stringfied XML and JSON"
}
```

### Remove data

This marks old data to be removed.

```
message: "remove"
json data: {
    totname: "This is the name of where you store data",
    name: "Name of data in .tot file"
}
```

### Hard-remove data

Hard-remove can be slower than remove. Because this rewrite whole data. Only for small files when you know what you are doing. Otherwise just use update and use clean every day, week or month. Take care of the data more efficiently.

```
message: "hard-remove"
json data: {
    totname: "This is the name of where you store data",
    name: "Name of data in .tot file"
}
```

### Clean

Clean is an operation that rewrite a .tot file and remove all data marked to be removed.

```
message: "clean"
json data: {
    totname: "This is the name of where you store data"
}
```

### Is open-tag exists?

This is probably unnecessary but this can help you check if the data exists.

```
message: "is-open-tag-exists"
json data: {
    totname: "This is the name of where you store data",
    name: "Name of data in .tot file"
}
```

### Is close-tag exists?

This is probably unnecessary but this can help you check if the data exists.

```
message: "is-close-tag-exists"
json data: {
    totname: "This is the name of where you store data",
    name: "Name of data in .tot file"
}
```

### Write an empty .tot file

This is probably unnecessary but this can help you to write an empty .tot file

```
message: "write"
json data: {
    totname: "This is the name of where you store data"
}
```

### Exit the process

You can kill tot.exe process

```
message: "exit"
```

## 😎 How to build this repository

1. Install node.js LTS first

2. Use git to clone this repository

3. Move to the cloneed repository directory

```
cd "path to this repository"
```

4. Install pkg module globally

```
npm i -g pkg
```

5. Now build!

For windows:

```
npm run build
```

Other OS, you should check pkg node module for your system. But you probably just need to change target.

- Windows example:

```
pkg src/main.js --targets node16-win --output tot"
```

- Mac OS might be something like:

```
pkg src/main.js --targets node16-mac --output tot"
```

Have a look at pkg module README.md to make sure what your are doing.

## 🤔Q&A

### 👽 Why Javascript?

There are so many advantage of using Javascript.

- It is easier to maintain.
- Asynchronous is so amazing that it can handle things so well.
- It is easier to build an executable as long as they know how to install node.js and run few commandlines.
- I like Javascript

## 💪 Sponsor

[Github sponsor page](https://github.com/sponsors/opdev1004)

## 👨‍💻 Author

[Victor Chanil Park](https://github.com/opdev1004)

## 💯 License

MIT, See [LICENSE](./LICENSE).
