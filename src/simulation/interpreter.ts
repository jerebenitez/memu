/* Example code matched by this:
    lw $31, 8($16)
    li $28, 100
    si $16, 105
    sw $1, 0($3)

    Spaces after instruction are mandatory, spaces after the comma are optional
*/
export const regex = /(?:([sl]w)\s\$(\d{1,2}),\s*(\d+)+\(\$(\d{1,2})\))|(?:([sl]i)\s\$(\d{1,2}),\s*(\d+))/gm
