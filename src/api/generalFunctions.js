export function typeFormat(type) {
    if (type.includes('array_')) {
        type = type.replace('array_', '');

        type = `array <${type}>`;
    }

    return type;
}