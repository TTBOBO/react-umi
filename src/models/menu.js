function formatter(data, parentAuthority, parentName) {
    if (!data) {
      return undefined;
    }
    return data
      .map(item => {
        if (!item.name || !item.path) {
          return null;
        }
  
        let locale = 'menu';
        if (parentName && parentName !== '/') {
          locale = `${parentName}.${item.name}`;
        } else {
          locale = `menu.${item.name}`;
        }
        // if enableMenuLocale use item.name,
        // close menu international
        const name = item.name;
        const result = {
          ...item,
          name,
          locale,
          authority: item.authority || parentAuthority,
        };
        if (item.routes) {
          const children = formatter(item.routes, item.authority, locale);
          // Reduce memory usage
          result.children = children;
        }
        delete result.routes;
        return result;
      })
      .filter(item => item);
  }
export default {
    namespace:"menu",
    state:{
        menuData:[]
    },
    effects:{
        *getMenuData({playload},{put}){
            const { routes, authority, path } = playload;
            const originalMenuData = formatter(routes,authority,path);
            console.log(originalMenuData,routes)
            // yield put({
            //     type:'save',
            //     playload:{menuData}
            // })
        }
    },
    reducers:{
        save(state,{playload}){
            return {
                ...state,
                ...playload
            }

        }
    }
}