// Copyright 2017, EMC, Inc.

'use strict';
/*jshint multistr: true */

module.exports = {
    friendlyName: 'Configure Megaraid Controler',
    injectableName: 'Graph.Bootstrap.Megaraid.Configure',
    options: {
        'bootstrap-ubuntu': {
             overlayfsFile: 'secure.erase.overlay.cpio.gz'
        },
        'config-raid':{
            hddArr: null,
            ssdStoragePoolArr:null,
            ssdCacheCadeArr:null,
            path:null,
            controller:null
        }
    },
    tasks: [
        {
            label: 'set-boot-pxe',
            taskName: 'Task.Obm.Node.PxeBoot',
            ignoreFailure: true
        },
        {
            label: 'reboot-start',
            taskName: 'Task.Obm.Node.Reboot',
            waitOn: {
                'set-boot-pxe': 'finished'
            }
        },
        {
            label: 'bootstrap-ubuntu',
            taskName: 'Task.Linux.Bootstrap.Ubuntu',
            waitOn: {
                'reboot-start': 'succeeded'
            }
        },
        {
            label: 'config-raid',
            taskName:'Task.Config.Megaraid',
            waitOn: {
                'bootstrap-ubuntu': 'succeeded'
            },
            ignoreFailure: true
        },
        {
            label: 'refresh-catalog-megaraid',
            taskName: 'Task.Catalog.megaraid',
            waitOn: {
                'config-raid': 'succeeded'
            }
        },
        {
            label: 'final-reboot',
            taskName: 'Task.Obm.Node.Reboot',
            waitOn: {
                'refresh-catalog-megaraid': 'finished'
            }
        }
    ]
};
