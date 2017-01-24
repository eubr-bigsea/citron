// First Random
var our_random_data = [
  {
    "rows": [
      { "id": "r-1", "name": "Row 1" , "group": "Grupo 1" },
      { "id": "r-2", "name": "Row 2" , "group": "Grupo 2" },
      { "id": "r-3", "name": "Row 3" , "group": "Grupo 3" }
    ],
    "columns": [
      { "id": "c-1", "name": "Column 1" , "group": "Grupo 1" },
      { "id": "c-2", "name": "Column 2" , "group": "Grupo 2" },
      { "id": "c-3", "name": "Column 3" , "group": "Grupo 3" },
      { "id": "c-4", "name": "Column 4" , "group": "Grupo 2" },
      { "id": "c-5", "name": "Column 5" , "group": "Grupo 2" }
    ],
    "links": [
      { "value": 9, "row": "r-1", "column": "c-1" },
      { "value": 2, "row": "r-1", "column": "c-2" },
      { "value": 8, "row": "r-1", "column": "c-3" },
      { "value": 3, "row": "r-1", "column": "c-4" },
      { "value": 1, "row": "r-1", "column": "c-5" },
      { "value": 3, "row": "r-2", "column": "c-1" },
      { "value": 1, "row": "r-2", "column": "c-2" },
      { "value": 9, "row": "r-2", "column": "c-3" },
      { "value": 1, "row": "r-2", "column": "c-4" },
      { "value": 7, "row": "r-2", "column": "c-5" },
      { "value": 6, "row": "r-3", "column": "c-1" },
      { "value": 1, "row": "r-3", "column": "c-2" },
      { "value": 3, "row": "r-3", "column": "c-3" },
      { "value": 1, "row": "r-3", "column": "c-4" },
      { "value": 6, "row": "r-3", "column": "c-5" }
    ]
  },
  // Square Matrix - Not Symmetric
  {
    "rows": [
      { "id": "r-1", "name": "Row 1" , "group": "Grupo 1" },
      { "id": "r-2", "name": "Row 2" , "group": "Grupo 2" },
      { "id": "r-3", "name": "Row 3" , "group": "Grupo 3" },
      { "id": "r-4", "name": "Row 4" , "group": "Grupo 3" },
      { "id": "r-5", "name": "Row 5" , "group": "Grupo 1" }
    ],
    "columns": [
      { "id": "c-1", "name": "Column 1" , "group": "Grupo 1" },
      { "id": "c-2", "name": "Column 2" , "group": "Grupo 2" },
      { "id": "c-3", "name": "Column 3" , "group": "Grupo 3" },
      { "id": "c-4", "name": "Column 4" , "group": "Grupo 2" },
      { "id": "c-5", "name": "Column 5" , "group": "Grupo 2" }
    ],
    "links": [
      { "value": 9, "row": "r-1", "column": "c-1" },
      { "value": 2, "row": "r-1", "column": "c-2" },
      { "value": 8, "row": "r-1", "column": "c-3" },
      { "value": 3, "row": "r-1", "column": "c-4" },
      { "value": 1, "row": "r-1", "column": "c-5" },
      { "value": 3, "row": "r-2", "column": "c-1" },
      { "value": 1, "row": "r-2", "column": "c-2" },
      { "value": 9, "row": "r-2", "column": "c-3" },
      { "value": 1, "row": "r-2", "column": "c-4" },
      { "value": 7, "row": "r-2", "column": "c-5" },
      { "value": 6, "row": "r-3", "column": "c-1" },
      { "value": 1, "row": "r-3", "column": "c-2" },
      { "value": 3, "row": "r-3", "column": "c-3" },
      { "value": 1, "row": "r-3", "column": "c-4" },
      { "value": 6, "row": "r-3", "column": "c-5" },
      { "value": 3, "row": "r-4", "column": "c-1" },
      { "value": 1, "row": "r-4", "column": "c-2" },
      { "value": 9, "row": "r-4", "column": "c-3" },
      { "value": 1, "row": "r-4", "column": "c-4" },
      { "value": 7, "row": "r-4", "column": "c-5" },
      { "value": 6, "row": "r-5", "column": "c-1" },
      { "value": 1, "row": "r-5", "column": "c-2" },
      { "value": 3, "row": "r-5", "column": "c-3" },
      { "value": 1, "row": "r-5", "column": "c-4" },
      { "value": 6, "row": "r-5", "column": "c-5" }
    ]
  },
  // Square Matrix - Simmetric groups
  {
    "rows": [
      { "id": "r-1", "name": "Row 1" , "group": "Grupo 1" },
      { "id": "r-2", "name": "Row 2" , "group": "Grupo 2" },
      { "id": "r-3", "name": "Row 3" , "group": "Grupo 3" },
      { "id": "r-4", "name": "Row 4" , "group": "Grupo 2" },
      { "id": "r-5", "name": "Row 5" , "group": "Grupo 2" }
    ],
    "columns": [
      { "id": "c-1", "name": "Column 1" , "group": "Grupo 1" },
      { "id": "c-2", "name": "Column 2" , "group": "Grupo 2" },
      { "id": "c-3", "name": "Column 3" , "group": "Grupo 3" },
      { "id": "c-4", "name": "Column 4" , "group": "Grupo 2" },
      { "id": "c-5", "name": "Column 5" , "group": "Grupo 2" }
    ],
    "links": [
      { "value": 9, "row": "r-1", "column": "c-1" },
      { "value": 2, "row": "r-1", "column": "c-2" },
      { "value": 8, "row": "r-1", "column": "c-3" },
      { "value": 3, "row": "r-1", "column": "c-4" },
      { "value": 1, "row": "r-1", "column": "c-5" },
      { "value": 3, "row": "r-2", "column": "c-1" },
      { "value": 1, "row": "r-2", "column": "c-2" },
      { "value": 9, "row": "r-2", "column": "c-3" },
      { "value": 1, "row": "r-2", "column": "c-4" },
      { "value": 7, "row": "r-2", "column": "c-5" },
      { "value": 6, "row": "r-3", "column": "c-1" },
      { "value": 1, "row": "r-3", "column": "c-2" },
      { "value": 3, "row": "r-3", "column": "c-3" },
      { "value": 1, "row": "r-3", "column": "c-4" },
      { "value": 6, "row": "r-3", "column": "c-5" },
      { "value": 3, "row": "r-4", "column": "c-1" },
      { "value": 1, "row": "r-4", "column": "c-2" },
      { "value": 9, "row": "r-4", "column": "c-3" },
      { "value": 1, "row": "r-4", "column": "c-4" },
      { "value": 7, "row": "r-4", "column": "c-5" },
      { "value": 6, "row": "r-5", "column": "c-1" },
      { "value": 1, "row": "r-5", "column": "c-2" },
      { "value": 3, "row": "r-5", "column": "c-3" },
      { "value": 1, "row": "r-5", "column": "c-4" },
      { "value": 6, "row": "r-5", "column": "c-5" }
    ]
  },

  // Transposed
  {
    "columns": [
      { "id": "c-1", "name": "Column 1" , "group": "Grupo 1" },
      { "id": "c-2", "name": "Column 2" , "group": "Grupo 2" },
      { "id": "c-3", "name": "Column 3" , "group": "Grupo 3" }
    ],
    "rows": [
      { "id": "r-1", "name": "Row 1" , "group": "Grupo 1" },
      { "id": "r-2", "name": "Row 2" , "group": "Grupo 2" },
      { "id": "r-3", "name": "Row 3" , "group": "Grupo 3" },
      { "id": "r-4", "name": "Row 4" , "group": "Grupo 2" },
      { "id": "r-5", "name": "Row 5" , "group": "Grupo 2" }
    ],
    "links": [
      { "value": 9, "column": "c-1", "row": "r-1" },
      { "value": 2, "column": "c-1", "row": "r-2" },
      { "value": 8, "column": "c-1", "row": "r-3" },
      { "value": 3, "column": "c-1", "row": "r-4" },
      { "value": 1, "column": "c-1", "row": "r-5" },
      { "value": 3, "column": "c-2", "row": "r-1" },
      { "value": 1, "column": "c-2", "row": "r-2" },
      { "value": 9, "column": "c-2", "row": "r-3" },
      { "value": 1, "column": "c-2", "row": "r-4" },
      { "value": 7, "column": "c-2", "row": "r-5" },
      { "value": 6, "column": "c-3", "row": "r-1" },
      { "value": 1, "column": "c-3", "row": "r-2" },
      { "value": 3, "column": "c-3", "row": "r-3" },
      { "value": 1, "column": "c-3", "row": "r-4" },
      { "value": 6, "column": "c-3", "row": "r-5" }
    ]
  }
]