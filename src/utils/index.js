export const flattenRoutes = arr =>
    arr.reduce(function(prev, item) {
        prev.push(item);
        return prev.concat(
            Array.isArray(item.children) ? flattenRoutes(item.children) : []
        );
    }, []);
