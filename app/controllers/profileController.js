import Profile from '../models/profile'; // 🧠 Use PascalCase for Mongoose models

export async function createProfile(data) {
  const {
    email, Name, ImageURL, Skills,
    Role, Projects, Portfolio, Price,
    Contact_Details
  } = data;

  if (!email || !Name || !Skills || !Role || !Projects || !Price || !Contact_Details) {
    return new Response(
      JSON.stringify({ message: 'All fields are required.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const existing = await Profile.findOne({ email });
    if (existing) {
      return new Response(
        JSON.stringify({ message: 'Profile already exists for this email.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const newProfile = new Profile({
      email,
      Name,
      ImageURL: ImageURL || '',
      Skills,
      Role,
      Projects,
      Portfolio,
      Price,
      Contact_Details,
    });

    await newProfile.save();

    return new Response(
      JSON.stringify({ message: '✅ Profile saved successfully!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Error saving profile:', err);
    return new Response(
      JSON.stringify({ message: '❌ Server error while saving profile.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function getProfiles(query = {}) {
  try {
    if (query?.email) {
      const foundProfile = await Profile.findOne({ email: query.email });

      if (!foundProfile) {
        return new Response(
          JSON.stringify({ message: 'Profile not found for this email.' }),
          {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(JSON.stringify(foundProfile), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const allProfiles = await Profile.find().sort({ _id: -1 });

    return new Response(JSON.stringify(allProfiles), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('❌ Error fetching profiles:', err);

    return new Response(
      JSON.stringify({ message: '❌ Server error while fetching profiles.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}


export async function deleteProfile(id) {
  try {
    const existingProfile = await Profile.findById(id);
    if (!existingProfile) {
      return new Response(
        JSON.stringify({ message: 'Profile not found.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await Profile.findByIdAndDelete(id);
    return new Response(
      JSON.stringify({ message: '✅ Profile deleted successfully.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Error deleting profile:', err);
    return new Response(
      JSON.stringify({ message: '❌ Failed to delete profile.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
