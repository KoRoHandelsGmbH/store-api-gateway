// We need to prevent the product GIFT_VOUCHER from being available via the StoreAPI right now.
export function useGiftVoucherFilter(item: unknown) {
    if (
        item?.apiAlias === 'product' &&
        item?.id === '3b6878fb7b9b4504a30d07ffe851cca3'
    ) {
        // Set 'available' to false if the condition is met
        item.available = false;
        item.active = false;
        item.stock = 0;
        item.availableStock = 0;
    }

    // Recursively check nested objects if they exist
    for (const key in item) {
        if (typeof item[key] === 'object' && item[key] !== null) {
            // Recursively call updateAvailability for nested objects
            useGiftVoucherFilter(item[key]);
        }
    }
}
