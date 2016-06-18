require(["jQuery"], function( $) {
   $(document).on('dblclick','.mermaid-container svg',function(){
        window.open(URL.createObjectURL(new Blob([this.outerHTML],{type:'image/svg+xml'})))
   });
});