const net = require('net');
const Tot = require('totjs');

try
{

    var tots = {};
    var port = 3000;
    var timer;

    const server = net.createServer((socket) =>
    {
        socket.on('data', async (data) =>
        {
            var dataObject = JSON.parse(data.toString());

            if (dataObject.message == 'init-tot')
            {
                tots[dataObject.totname] = new Tot(dataObject.filename);
                socket.write(true);
            }
            else if (dataObject.message == 'open')
            {
                await tots[dataObject.totname].open(dataObject.filename);
                socket.write(true);
            }
            else if (dataObject.message == 'close')
            {
                await tots[dataObject.totname].open(dataObject.filename);
                socket.write(true);
            }
            else if (dataObject.message == 'get-data-by-name')
            {
                const response = await tots[dataObject.totname].getDataByNameAt(dataObject.name)
                socket.write(response);
            }
            else if (dataObject.message == 'get-data-by-name-at')
            {
                const response = await tots[dataObject.totname].getDataByNameAt(dataObject.name, dataObject.position)
                socket.write(response);
            }
            else if (dataObject.message == 'push')
            {
                const response = await tots[dataObject.totname].push(dataObject.name, dataObject.data)
                socket.write(response);
            }
            else if (dataObject.message == 'update')
            {
                const response = await tots[dataObject.totname].update(dataObject.name, dataObject.data)
                socket.write(response);
            }
            else if (dataObject.message == 'hard-update')
            {
                const response = await tots[dataObject.totname].update(dataObject.name, dataObject.data)
                socket.write(response);
            }
            else if (dataObject.message == 'remove')
            {
                const response = await tots[dataObject.totname].remove(dataObject.name)
                socket.write(response);
            }
            else if (dataObject.message == 'hard-remove')
            {
                const response = await tots[dataObject.totname].hardRemove(dataObject.name)
                socket.write(response);
            }
            else if (dataObject.message == 'clean')
            {
                const response = await tots[dataObject.totname].clean()
                socket.write(response);
            }
            else if (dataObject.message == 'is-open-tag-exists')
            {
                const response = await tots[dataObject.totname].isOpenTagExists(dataObject.name)
                socket.write(response);
            }
            else if (dataObject.message == 'is-close-tag-exists')
            {
                const response = await tots[dataObject.totname].isCloseTagExists(dataObject.name)
                socket.write(response);
            }
            else if (dataObject.message == 'write')
            {
                await tots[dataObject.totname].create()
                socket.write(true);
            }
            else if (dataObject.message == 'exit')
            {
                process.exit(0);
            }

            refreshTimer();
        });

        socket.on('end', () =>
        {
            process.exit(0);
        });
    });


    port = process.argv[2]

    server.listen(port, () =>
    {
        console.log(`
            Tot.exe running for support your application.
            Please do not close this until you close your application.
            If this is running without other application, you can just close it manually.
        `);
    });

    timer = setTimeout(() =>
    {
        process.exit(0);
    }, 5 * 60 * 1000);
}
catch (error)
{
    console.error(error);
    socket.write(error.toString());
}

function refreshTimer()
{
    clearTimeout(timer);

    timer = setTimeout(() =>
    {
        process.exit(0);
    }, 5 * 60 * 1000);
}