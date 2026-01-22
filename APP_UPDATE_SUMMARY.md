Service Finder App - Complete Update Summary

LANGUAGE SUPPORT
- Fully bilingual (Arabic/English) with language toggle button in header
- All text labels, messages, and instructions support both languages
- RTL support for Arabic layout

APPLICATION FLOW

For Banks:
1. Main screen shows all services (including Banks)
2. Select Banks → Select Bank Type (Ahlي, Misr, Zراعي)
3. Select Branch from filtered list (with distance range slider: 1-100 km)
4. View ATM List with:
   - Distance range filter (1-100 km)
   - Sort options (by distance or queue)
   - ATM details (status, operations, queue)
5. View ATM Details with:
   - Full ATM information
   - Withdrawal amount validator
   - Available denominations
   - Operating status

For Other Services:
1. Main screen shows all services
2. Select Service type
3. View Branch List with:
   - Distance range filter (1-100 km)
   - Sort by distance
   - Branch details (queue, wait time, services, etc.)
4. View Branch Details

KEY FEATURES
- Distance calculation using Haversine formula
- Range filter input for all location-based views
- Real-time validation for ATM withdrawal amounts
- Service-specific information display
- Mobile responsive design
- Color scheme exactly as specified: Green (#36e27b), Black (#111714), Yellow (#d1a220), Red (#c93d3c), White (#ffffff), grays
- Smooth hover effects and transitions

COMPONENTS UPDATED
- page.tsx: Main app logic with language state and navigation
- OrganizationSelector: Bank selection with bilingual support
- BankServiceTypeSelector: Branch selection with distance filter
- ATMList: ATM list with distance and queue filters
- ATMDetailsScreen: Detailed ATM information
- ServiceTypeSelector: Shows all services without hiding
- BranchDetailsList: Service branches with distance filter
- ServiceBranchDetailsScreen: Service details
- StatusBadge: Bilingual status display

DATA STRUCTURE
- Multiple branches per organization (5+ branches each)
- Multiple ATMs per branch (2-5 ATMs each)
- Complete service information with coordinates
- Mock data ready for replacement with real API

All services are visible on the first screen - nothing is hidden!
