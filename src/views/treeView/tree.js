const tree = [{
        id: 13,
        name: "g8",
        parent_id: 1,
        children: [{
                id: 123,
                name: "c1",
                parent_id: 2
            },
            {
                id: 133,
                name: "c2",
                parent_id: 3,
                children: [{
                    id: 500,
                    name: "f2",
                    parent_id: 4
                }, {
                    id: 501,
                    name: "f2",
                    parent_id: 5
                }]
            }
        ]
    },
    {
        id: 14,
        name: "g9",
        parent_id: 6
    },
    {
        id: 15,
        name: "g10",
        parent_id: 7
    },
    {
        id: 16,
        name: "g11",
        parent_id: 8
    }
]
export default tree;