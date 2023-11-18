// Importing necessary modules from Lightning Web Components and Salesforce Apex
import { LightningElement, track, api, wire } from 'lwc';
import searchDataraptorParents from '@salesforce/apex/DataRaptorSearchController.searchDataraptorParents';
import searchDataraptor from '@salesforce/apex/DataRaptorSearchController.searchDataraptor';
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class DataraptorFinder extends LightningElement {
    // Tracking properties to trigger reactivity
    @track arrayOfParentAsOmniscript;
    @track arrayOfParentAsIP;
    @track drSearchTerm = '';
    @track showSuggestions = false;
    @track drSuggestions = [];
    @track showSpinner=false;
   
    // Method to handle changes in the search term
    handleSearchTermChange(dataRaptorname) {
        searchDataraptorParents({ searchTerm: dataRaptorname })
            .then(result => {
                this.processSearchResult(JSON.parse(result));
            })
            .catch(error => {
                this.showNotification("Error","Something went wrong!","error")
            });
    }
    
    // Method to process the search result and categorize them as OmniScript or Integration Procedure
    processSearchResult(result)
    {
        this.arrayOfParentAsOmniscript = result.filter(record=>{
            return record.ElementType=='OmniScript';
        });;
        this.arrayOfParentAsIP = result.filter(record=>{
            return record.ElementType=='Integration Procedure';
        });
    }

    // Method to search for DataRaptor names based on user input
    searchDataRaptorName(event) {
        this.showSpinner=true;
        this.drSearchTerm = event.target.value;
        setTimeout(() => {
            searchDataraptor({ searchTerm: this.drSearchTerm })
                .then(result => {
                    this.drSuggestions = result;
                    this.showSpinner=false;
                })
                .catch(error => {
                    // Handle error
                    this.showSpinner=false;
                    this.showNotification("Error","Something went wrong!","error");
                });
        }, 300);
        
        this.showSuggestions = this.drSuggestions.length > 0;
    }


    // Method to handle click events on DataRaptor suggestions
    handleDrSuggestionClick(event) {
        const selectedDrId = event.currentTarget.dataset.id;
        const selectedSuggestion = this.drSuggestions.find(drRecord => drRecord.Id === selectedDrId);
        this.dispatchEvent(new CustomEvent('select', { detail: selectedSuggestion }));
        this.drSearchTerm = selectedSuggestion.Name;
        this.showSuggestions = false;
        this.handleSearchTermChange(selectedSuggestion.Name);
    }
    
    // Method to display notifications
    showNotification(title,message,variant) {
        const evt = new ShowToastEvent({
          title: title,
          message: message,
          variant: variant,
        });
        this.dispatchEvent(evt);
      }
    
}