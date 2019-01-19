import '@webcomponents/webcomponentsjs';
import Counter from './components/Counter';
import store from './store';

class App {

  constructor() {
    this.initComponents();
    store.subscribe(()=>{      
      const altogether = store.getState().reduce((acc, currentCounter)=>{ return currentCounter.counter + acc}, 0)
      this.changeAltogether(altogether);
    });
  }

  changeAltogether(altogether) {
    document.getElementById('altogether').innerHTML = altogether;
  }

  initComponents() {
    window.customElements.define('my-counter', Counter);
  }

}

(function(){
  new App();
})();


