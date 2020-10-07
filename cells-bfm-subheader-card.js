{
  const {
    html,
  } = Polymer;
  /**
    `<cells-bfm-subheader-card>` Description.

    Example:

    ```html
    <cells-bfm-subheader-card></cells-bfm-subheader-card>
    ```

   ### Custom Properties
   | Custom Property                            | Selector         | CSS Property     | Value                                                            |
   | ------------------------------------------ | ---------------- | ---------------- | ---------------------------------------------------------------- |
   | --cells-fontDefault                        | :host            | font-family      | sans-serif                                                       |
   | --bbva-100                                 | .content         | background-color | ![#F4F4F4](https://placehold.it/15/F4F4F4/000000?text=+) #F4F4F4 |
   | --bbva-white                               | .content .cgt    | background-color | ![#ffffff](https://placehold.it/15/ffffff/000000?text=+) #ffffff |
   | --cells-bfm-subheader-card-balance         | .balance         | color            | --bbva-500                                                       |
   | --cells-bfm-subheader-card-balanceQuantity | .balanceQuantity | color            | --bbva-600                                                       |
   | --cells-bfm-subheader-card-update-date     | .update          | color            | --bbva-600                                                       |
   | --cells-bfm-subheader-card-update-date     | .date            | color            | --bbva-600                                                       |
   | --cells-bfm-subheader-card-reload-color    | .reload          | color            | --bbva-medium-blue                                               |
   | --cells-bfm-subheader-card-reload          | .reload          | background-color | --bbva-white                                                     |
   | Mixins                                     | Selector         | Value |
   | ------------------------------------------ | ---------------- | ----- |
   | --cells-bfm-subheader-card                 | :host            | {}    |
   | --cells-bfm-subheader-card-container       | .content         | {}    |
   | --cells-bfm-subheader-card-imgView         | .imgView         | {}    |
   | --cells-bfm-subheader-card-firstParagraph  | .firstParagraph  | {}    |
   | --cells-bfm-subheader-card-secondParagraph | .secondParagraph | {}    |
   | --cells-bfm-subheader-card-thirdParagraph  | .thirdParagraph  | {}    |
   | --cells-bfm-subheader-card-card            | .card            | {}    |
   | --cells-bfm-subheader-card-concept         | .concept         | {}    |
   | --cells-bfm-subheader-card-concept         | .noAccount       | {}    |
   | --cells-bfm-subheader-card-accountType     | .balance         | {}    |
   | --cells-bfm-subheader-card-accountType     | .accountType     | {}    |
   | --cells-bfm-subheader-card-accountType     | .company         | {}    |
   | --cells-bfm-subheader-card-company         | .company         | {}    |
   | --cells-bfm-subheader-card-balance         | .balance         | {}    |
   | --cells-bfm-subheader-card-currency        | .balanceQuantity | {}    |
   | --cells-bfm-subheader-card-currency        | .currency        | {}    |
   | --cells-bfm-subheader-card-balanceQuantity | .balanceQuantity | {}    |
   | --cells-bfm-subheader-card-update          | .update          | {}    |
   | --cells-bfm-subheader-card-update          | .date            | {}    |
   | --cells-bfm-subheader-card-reload          | .reload          | {}    |
   | --cells-bfm-subheader-card-reload-icon     | .reload-icon     | {}    |
   | --cells-bfm-subheader-card-select          | .select          | {}    |

    * @customElement
    * @polymer
    * @extends {Polymer.Element}
    * @demo demo/index.html
   * @hero cells-bfm-subheader-card.png
  */
  class CellsBfmSubheaderCard extends Polymer.mixinBehaviors([ CellsBehaviors.i18nBehavior, ], Polymer.Element) {
    static get is() {
      return 'cells-bfm-subheader-card';
    }

    static get properties() {
      return {

        /**
         * Field that obtains a string with the path of the bank image
         */
        logo: {
          type: String,
          value: '',
          notify: true
        },

        /**
         * Object that fills the subheader-card
         */
        basicContent: {
          type: Object,
          value: () => {},
          notify: true,
          observer: '_contentChange'
        },
        balance: {
          type: String,
          value: 'Saldo Disponible',
          notify: true
        },

        /**
         * String that constant
         */
        update: {
          type: String,
          value: 'Última actualización: ',
          notify: true
        },

        /**
         * Field for the current date
         */
        date: {
          type: String,
          notify: true
        },
        listEnterprise: {
          type: Array,
          value: () => []
        },
        placeholder: {
          type: String,
          value: ''
        },
        selectionIndex: {
          type: Number,
          value: 1,
          notify: true
        },
        indexFlag: {
          type: Number,
          value: 1,
          notify: true
        },
        account: {
          type: Object,
          value: () => {},
          notify: true,
          observer: '_checkValue'
        },
        selectedOption: {
          type: Object,
          value: () => {},
          notify: true
        }
      };
    }

    changes(e) {
      if (e.target._selectedItem.classList[0] === 'change') {
        this.shadowRoot.querySelector('.select').opened = true;
        e.target.selected = this.selectionIndex;
      } else {
        this.set('selectionIndex', e.target.selected);
      }
    }

    list(e) {
      const data = e.currentTarget.dataOptionValue;
      data.name = e.currentTarget.name.name;
      data.bank = e.currentTarget.bank.bank;
      this.set('account', data);
    }

    _checkValue(newValue, oldValue) {
      if (oldValue !== undefined) {
        this.dispatchEvent(new CustomEvent('cells-bfm-subheader-card-account-changed', {
          bubbles: true,
          composed: true,
          detail: newValue
        }));
      }
    }

    calculateIndex(indexEnterprise, indexBalance) {
      return indexEnterprise + 1 + indexBalance + 1;
    }

    ready() {
      super.ready();
    }

    /**
     * Method that through the name of the bank returns the path of the image of the bank
     * @param {*} bankName
     */
    setImage(option) {
      let image = '';
      switch (option) {
        case 'BBVA BANCOMER': {
          image = './resources/images/BBVA.png';
          break;
        }
        case 'SANTANDER': {
          image = './resources/images/Santander.png';
          break;
        }
        case 'CITIBANAMEX': {
          image = './resources/images/Citibanamex.png';
          break;
        }
        case 'Scotiabank': {
          image = './resources/images/Scotiabank.png';
          break;
        }
      }
      return image;
    }
    /**
     * Method in which the current date and time is calculated
     * @param basicContent
     */
    refresh(basicContent) {
      let today = new Date();
      let day = new Intl.DateTimeFormat(undefined, {day: '2-digit'}).format(today);
      let month = new Intl.DateTimeFormat(undefined, {month: 'short'}).format(today);
      month = month.charAt(0).toUpperCase() + month.slice(1, month.length - 1);
      let time = new Intl.DateTimeFormat(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(today);
      time = time.split('.').join('');
      time = time.substring(0, time.length - 2) + time.charAt(time.length - 1);
      this.set('date', day + '/' + month + '/' + today.getFullYear() + ' ' + time);
      return this.get('date');
    }

    /**
     * Method that monitors the type of issue
     * @param {*} basicContent
     */
    transform(basicContent) {
      let typeaccount = this.get('basicContent.typeac');
      switch (typeaccount) {
        case 'CH':
        case 'Ch':
        case 'ch':
          return 'Cuenta de Cheques';
        case 'AH':
        case 'Ah':
        case 'ah':
          return 'Cuenta de Ahorro';
        default: return 'Cuenta genérica';
      }
    }

    parseCommasOrPoints(element, elementFlag) {
      if (element === undefined) {
        return null;
      }
      element = element.toString();
      if (!element.includes('.')) {
        element = element + '.00';
      }
      let index = element.lastIndexOf('.');
      let number = element.slice(0, index);
      number = elementFlag ? parseInt(number).toLocaleString() : String(parseInt(number).toLocaleString()).replace(/,/g, '.');
      return (elementFlag ? number + element.slice(index, element.length) : number + ',' + element.slice(index + 1, element.length));
    }
  }
  customElements.define(CellsBfmSubheaderCard.is, CellsBfmSubheaderCard);
}
