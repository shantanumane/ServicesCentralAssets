// Importing necessary modules from Lightning Web Components
import { LightningElement, api } from 'lwc';
import { NavigationMixin } from "lightning/navigation";

var actions = [
    { label: 'Details', name: 'show_details' }
]

// Define columns for the OmniScript and Integration Procedure tables
const omniScriptColumns = [
    { label: 'OmniScript Name', fieldName: 'ElementName' },
    { label: 'Status', fieldName: 'IsActive' },
    { type: 'action', typeAttributes: { rowActions: actions } }
];
const ipColumns = [
    { label: 'Integration Procedure Name', fieldName: 'ElementName' },
    { label: 'Status', fieldName: 'IsActive' },
    { type: 'action', typeAttributes: { rowActions: actions } }
];

// Exporting the Lightning Web Component class
export default class DataRaptorFinderSearchResult extends NavigationMixin(LightningElement) {

    // Expose properties to make them available for parent components
    @api omniSciptResult;
    @api ipResult;

    // Assign the predefined columns to component properties
    omniTableColumns=omniScriptColumns;
    ipTableColumns=ipColumns;

    handleShowMoreAction(event) {
        // Retrieve the action and row details from the event
        const action = event.detail.action;
        const row = event.detail.row;

        if(action.name=='show_details' )
        {
            this.navigateToOmniRecord(row)
        }
        
    }
    navigateToOmniRecord(row)
    {
        // Use NavigationMixin to navigate to the record page
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: row.Id,
                objectApiName: 'OmniProcess',
                actionName: row.ElementType=='OmniScript'?'view':'edit',
            },
        });
    }
}