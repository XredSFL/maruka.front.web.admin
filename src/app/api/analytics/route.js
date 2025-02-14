import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Starting analytics data fetch');

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS),
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    console.log('Auth created');

    const analyticsData = google.analyticsdata({
      version: 'v1beta',
      auth,
    });

    console.log('Analytics data client created');

    const propertyId = '471820038'; // Make sure this is your correct GA4 Property ID

    console.log('Fetching reports');

    const [thisMonthResponse, lastMonthResponse] = await Promise.all([
      analyticsData.properties.runReport({
        property: `properties/${propertyId}`,
        requestBody: {
          dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
          metrics: [
            { name: 'activeUsers' },
            { name: 'screenPageViews' },
            { name: 'sessions' },
          ],
          dimensions: [{ name: 'date' }],
        },
      }),
      analyticsData.properties.runReport({
        property: `properties/${propertyId}`,
        requestBody: {
          dateRanges: [{ startDate: '60daysAgo', endDate: '31daysAgo' }],
          metrics: [
            { name: 'activeUsers' },
            { name: 'screenPageViews' },
            { name: 'sessions' },
          ],
          dimensions: [{ name: 'date' }],
        },
      }),
    ]);

    console.log('Reports fetched');

    console.log('This month response:', JSON.stringify(thisMonthResponse.data, null, 2));
    console.log('Last month response:', JSON.stringify(lastMonthResponse.data, null, 2));

    // Add error checking and provide default values
    const thisMonth = thisMonthResponse.data.rows && thisMonthResponse.data.rows.length > 0
      ? thisMonthResponse.data.rows.reduce((sum, row) => sum + parseInt(row.metricValues[0].value), 0)
      : 0;
    
    const lastMonth = lastMonthResponse.data.rows && lastMonthResponse.data.rows.length > 0
      ? lastMonthResponse.data.rows.reduce((sum, row) => sum + parseInt(row.metricValues[0].value), 0)
      : 0;

    const total = thisMonth + lastMonth;

    console.log('Data processed');

    return NextResponse.json({
      thisMonth,
      lastMonth,
      total,
      thisMonthPageViews: thisMonthResponse.data.rows && thisMonthResponse.data.rows.length > 0
        ? thisMonthResponse.data.rows.reduce((sum, row) => sum + parseInt(row.metricValues[1].value), 0)
        : 0,
      lastMonthPageViews: lastMonthResponse.data.rows && lastMonthResponse.data.rows.length > 0
        ? lastMonthResponse.data.rows.reduce((sum, row) => sum + parseInt(row.metricValues[1].value), 0)
        : 0,
      thisMonthSessions: thisMonthResponse.data.rows && thisMonthResponse.data.rows.length > 0
        ? thisMonthResponse.data.rows.reduce((sum, row) => sum + parseInt(row.metricValues[2].value), 0)
        : 0,
      lastMonthSessions: lastMonthResponse.data.rows && lastMonthResponse.data.rows.length > 0
        ? lastMonthResponse.data.rows.reduce((sum, row) => sum + parseInt(row.metricValues[2].value), 0)
        : 0,
    });
  } catch (error) {
    console.error('Error in GET /api/analytics:', error);
    return NextResponse.json({ error: error.toString(), stack: error.stack }, { status: 500 });
  }
}