import store from "@/store";
export function Disablebutton(string) {
    var button = store.state.userinfo.userPremisson
    const boolen = true
    if (boolen === true) {
        for (var i = 0; i < button.length; i++) {
            if (button[i] === string || button[i] == "*:*:*") {
                return false
            }
        }
        return true
    }

}


