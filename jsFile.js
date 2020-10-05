class ModalElement extends Polymer.Element {

    static get is() { return 'modal-element'; }
    static get properties() {
        return {
            delay: {
                type: Number,
                value: 1000
            },
            title: {
                type: String,
                value: 'Este es el title'
            },
            body: {
                type: String,
                value: 'Este es el body'
            },
            isOpened: {
                type: Boolean,
                value: false
            },
            myObject: {
                type: Object,
                value: () => ({})
            }
        };
    }

    show(){
        setTimeout(() => {
            this.show2();
            console.log('delay de: ', this.delay);
        }, this.delay);
    }

    show2(){

        this.set('isOpened', true);

        this.dispatchEvent(new CustomEvent('modal-opened', {
            bubbles: false,
            composed: false,
            detail: 'Is opened: ' + this.isOpened
        }));
    }

    hide(){
        this.set('isOpened', false);

        this.dispatchEvent(new CustomEvent('modal-closed', {
            bubbles: false,
            composed: false,
            detail: 'Is opened: ' + this.isOpened
        }));
    }
}

window.customElements.define(ModalElement.is, ModalElement);