from rest_framework import serializers
from .models import MentalGameResult, QuantitativeSpsec, VerbalSpsec, Contact
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class MentalGameResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentalGameResult
        fields = '__all__'

class QuantitativeSpsecSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuantitativeSpsec
        fields = '__all__'

class VerbalSpsecSerializer(serializers.ModelSerializer):
    class Meta:
        model = VerbalSpsec
        fields = '__all__'

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class MentalGameSerializer(serializers.ModelSerializer):
    mentalGameResults = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = MentalGameResult
        fields = '__all__'

    def get_mentalGameResults(self, obj):
        #results = obj.mentalgameresult_set.all()
        serializer = MentalGameResultSerializer(MentalGameResult.objects.all(), many=True)
        return serializer.data

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data

class QuantitativeSerializer(serializers.ModelSerializer):
    quantitativeSpsecs = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = QuantitativeSpsec
        fields = '__all__'

    def get_quantitativeSpsecs(self, obj):
        #results = obj.quantitativespsec_set.all()
        serializer = QuantitativeSpsecSerializer(QuantitativeSpsec.objects.all(), many=True)
        return serializer.data

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data

class VerbalSerializer(serializers.ModelSerializer):
    verbalSpsec = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = VerbalSpsec
        fields = '__all__'

    def get_verbalSpsec(self, obj):
        serializer = VerbalSpsecSerializer(VerbalSpsec.objects.all(), many=True)
        return serializer.data

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data

class ContactSerializer(serializers.ModelSerializer):
    contact = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Contact
        fields = '__all__'

    def get_contact(self, obj):
        serializer = ContactMessageSerializer(Contact.objects.all(), many=True)
        return serializer.data

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data
