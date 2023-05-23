from django.db import models
from django.urls import reverse


class State(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    name = models.CharField(max_length=40)
    abbreviation = models.CharField(max_length=2, unique=True)

    def __str__(self):
        return f"{self.abbreviation}"

    class Meta:
        ordering = ("name",)


class Location(models.Model):
    name = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    room_count = models.PositiveSmallIntegerField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    picture_url = models.URLField(null=True)

    state = models.ForeignKey(
        State,
        related_name="+",
        on_delete=models.PROTECT,
    )

    def get_api_url(self):
        return reverse("api_show_location", kwargs={"pk": self.pk})

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("name",)


class Conference(models.Model):
    name = models.CharField(max_length=200)
    starts = models.DateTimeField()
    ends = models.DateTimeField()
    description = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    max_presentations = models.PositiveSmallIntegerField()
    max_attendees = models.PositiveIntegerField()

    location = models.ForeignKey(
        Location,
        related_name="conferences",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_show_conference", kwargs={"pk": self.pk})

    def __str__(self):
        return self.name

    class Meta:
        ordering = ("starts", "name")
