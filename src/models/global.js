export default {
    namespace:"global",
    state:{
        collapsed:false
    },
    reducers:{
        changeLayoutCollapsed(state,{playload}){
            return {
                ...state,
                collapsed:playload
            }
        }
    }
}