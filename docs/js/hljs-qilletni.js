(function(hljs) {
    const qilletniDefinition = {
        name: 'Qilletni',
        aliases: ['qil'],
        keywords: {
            $pattern: /[a-zA-Z_][a-zA-Z0-9_]*/,
            keyword:
                'import as if else for fun static native on return ' +
                'empty new order limit loop is infinity play provider by',
            literal: 'true false',
            type: 'any int double string boolean collection song album java entity weights'
        },
        contains: [
            {
                className: 'comment',
                variants: [
                    hljs.COMMENT('//', '$'),
                    hljs.COMMENT('/\\*\\*', '\\*/', { relevance: 0 }),
                    hljs.COMMENT('/\\*', '\\*/', { relevance: 0 })
                ]
            },
            {
                className: 'string',
                begin: /"/,
                end: /"/,
                contains: [{ begin: /\\./ }]
            },
            {
                className: 'number',
                begin: /\b-?\d+(\.\d+)?[Dx%]?\b/,
                relevance: 0
            },
            {
                className: 'operator',
                begin: /\+\+|\-\-|\+=|\-=|\*=|\/~|==|!=|>=|<=|=|\+|\-|\/|\.\.|%|!/,
                relevance: 0
            },
            // Exclude keywords like `if`, `else`, `for`, etc. from being treated as function names
            {
                className: 'function',
                begin: /\b(?!if|else|for|while|return|native|fun)[a-zA-Z_][a-zA-Z0-9_]*(?=\s*\()/,
                relevance: 0
            }
        ]
    };

    hljs.registerLanguage('qilletni', function() {
        return qilletniDefinition;
    });
})(hljs);
