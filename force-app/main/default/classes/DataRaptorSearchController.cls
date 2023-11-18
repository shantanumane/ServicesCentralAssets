/**
 * Apex class for searching DataRaptor elements.
 * Developer: Shantanu Mane
 * Date: November 16, 2023
 * Description: This class provides methods for searching parent DataRaptor elements
 *              and DataRaptor elements based on certain criteria.
 */

public with sharing class DataRaptorSearchController {

    /**
     * Method to search for parent DataRaptor elements based on a specific name.
     * @param searchTerm The dataraptor name to search for.
     * @return List of OmniProcessElement records matching the search criteria.
     */
    @AuraEnabled(cacheable=true)
    public static String searchDataraptorParents(String searchTerm){
        try {
            // Initialize a list to store the results
            List<omniProcessWrapper> parentList=new List<omniProcessWrapper>();
            
            // Check if the search term is not null
            if(searchTerm!=null)
            {
                // Get the types of elements to be searched from a custom label
                List<String> ElementToBeSearched=(System.Label.ElementTypeToBeSearched).split(',');
                for(OmniProcessElement process:[select Id,PropertySetConfig,OmniProcess.Id,
                                                       OmniProcess.IsActive, OmniProcess.Name,
                                                       OmniProcess.OmniProcessType from OmniProcessElement 
                                                       where Type in :ElementToBeSearched ])
                {
                    if(String.valueOf(process.PropertySetConfig).contains(searchTerm) && process.OmniProcess!=null)
                    {
                        parentList.add(new omniProcessWrapper(process));
                    }
                }
            }
            System.debug('data--'+(Object)JSON.serialize(parentList));
            return JSON.serialize(parentList);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    /**
     * Method to search for DataRaptor elements based on a partial name match.
     * @param searchTerm The partial dataraptor name to search for.
     * @return List of OmniProcessElement records matching the partial name match.
     */
    @AuraEnabled(cacheable=true)
    public static List<OmniDataTransform> searchDataraptor(String searchTerm) {
        // Construct a wildcard query for the partial name match
        String dataraptorName = '%' + searchTerm + '%';

        // Get the types of elements to be searched from a custom label
        List<String> ElementToBeSearched=(System.Label.ElementTypeToBeSearched).split(',');

        // Query the OmniProcessElement records based on the partial name match and types
        //return [select Id, Name  from OmniProcessElement where Name like : dataraptorName and Type in :ElementToBeSearched limit 5 ];
        return [select Id, Name  from OmniDataTransform where Name like : dataraptorName  limit 5 ];

    }


    /**
     * Wrapper class to represent an OmniProcessElement in a more simplified form.
    * Used for returning results in a more concise format.
     */
    public class omniProcessWrapper{
        public String Id;
        public String ElementType;
        public String ElementName;
        public String IsActive;
        /**
         * Constructor to create an instance of omniProcessWrapper based on an OmniProcessElement.
         * @param process The OmniProcessElement to be wrapped.
         */
        public omniProcessWrapper(OmniProcessElement process)
        {
            this.Id = process.OmniProcess.Id;
            this.ElementType= process.OmniProcess.OmniProcessType;
            this.ElementName= process.OmniProcess.Name;
            this.IsActive= process.OmniProcess.IsActive==true?'Active':'Inactive';
        }
    }
}