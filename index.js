/*  
*   @package vue-xframe
*   @description A simple workaround to implement x-frame-bypass https://github.com/niutech/x-frame-bypass in vue projects
*   @version 1.0.0
*/ 

export default xframe = {
    bind(el, binding, vnode) {
        let url = binding.value;
        // uncomment this line if you want check urls for https://
        //if( url.startsWith('https://') ) {
        fetch(`https://cors-anywhere.herokuapp.com/${url}`)
        .then( (res) => res.text() )
        .then( (data) => {
            let iframeContent = data.replace(/<head([^>]*)>/i, `<head$1>
                <base href="${url}">
                    <script>
                    // X-Frame-Bypass navigation event handlers
                    document.addEventListener('click', e => {
                        if (frameElement && document.activeElement && document.activeElement.href) {
                            e.preventDefault()                                
                            frameElement.load(document.activeElement.href)
                        }
                    });
                    document.addEventListener('submit', e => {
                        if (frameElement && document.activeElement && document.activeElement.form && document.activeElement.form.action) {
                            e.preventDefault()
                            if (document.activeElement.form.method === 'post') {
                                frameElement.load(document.activeElement.form.action, {method: 'post', body: new FormData(document.activeElement.form)});
                            }else{
                                frameElement.load(document.activeElement.form.action + '?' + new URLSearchParams(new FormData(document.activeElement.form)));
                            }
                        }
                    });
                    </\script>`);
            el.srcdoc = content;
        });
        //}
    }         
}